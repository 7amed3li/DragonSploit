// src/worker/jobs/scan.ts

import { Job } from 'bullmq';
import { ScanStatus } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
import { prisma } from '../../db';

// --- بداية الدمج ---
// استيراد جميع الطوابير المتخصصة التي أنشأناها
import { wordpressQueue } from '../queues/wordpress';
import { laravelQueue } from '../queues/laravel';
import { drupalQueue } from '../queues/drupal';
import { nginxQueue } from '../queues/nginx';
import { apacheQueue } from '../queues/apache';
import { sqliQueue } from '../queues/sqli';
import { xssQueue } from '../queues/xss';
// --- نهاية الدمج ---

// واجهة لتعريف شكل بيانات المهمة لضمان Type-Safety
interface ScanJobData {
  scanId: string;
  targetId: string;
  targetUrl: string;
}

// واجهة لتعريف شكل كائن بصمة التكنولوجيا
interface TechnologyFingerprint {
  server?: string;
  poweredBy?: string;
  cookies?: string[];
  metaGenerators?: string[];
  detectedFrameworks?: string[];
}

/**
 * يعمل كـ "منسق" (Orchestrator):
 * 1. يقوم بعملية بصمة التكنولوجيا.
 * 2. يحلل النتائج.
 * 3. يوزع مهامًا جديدة على العمال المتخصصين.
 * 4. ينهي مهمة التنسيق.
 */
export const processScanJob = async (job: Job<ScanJobData>): Promise<void> => {
  const { scanId, targetUrl } = job.data;
  console.log(`[Orchestrator] Starting orchestration for scan ID: ${scanId} on URL: ${targetUrl}`);

  // تحديث الحالة إلى RUNNING
  await prisma.scan.update({
    where: { id: scanId },
    data: { status: 'RUNNING', startedAt: new Date() },
  });

  try {
    // إرسال طلب HTTP وجمع البصمات
    const response = await axios.get(targetUrl, {
      httpsAgent: new (require('https'  )).Agent({ rejectUnauthorized: false }),
      timeout: 15000,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' },
    });
    const fingerprint = analyzeResponse(response);
    console.log(`[Orchestrator] Fingerprint for ${targetUrl}:`, fingerprint);

    // --- بداية منطق التنسيق المحدث والكامل ---
    console.log(`[Orchestrator] Analyzing fingerprint and dispatching specialized jobs...`);
    let dispatchedJobsCount = 0;
    const jobPayload = { scanId: scanId, targetUrl: targetUrl };

    // 1. فحوصات إطارات العمل (Frameworks)
    if (fingerprint.detectedFrameworks?.includes('WordPress')) {
      await wordpressQueue.add('wordpress-scan-job', jobPayload);
      dispatchedJobsCount++;
    }
    if (fingerprint.cookies?.some(c => c.startsWith('laravel_session'))) {
      await laravelQueue.add('laravel-scan-job', jobPayload);
      dispatchedJobsCount++;
    }
    if (fingerprint.detectedFrameworks?.includes('Drupal')) {
      await drupalQueue.add('drupal-scan-job', jobPayload);
      dispatchedJobsCount++;
    }

    // 2. فحوصات خوادم الويب (Web Servers)
    if (fingerprint.server?.toLowerCase().includes('nginx')) {
      await nginxQueue.add('nginx-check-job', jobPayload);
      dispatchedJobsCount++;
    }
    if (fingerprint.server?.toLowerCase().includes('apache')) {
      await apacheQueue.add('apache-check-job', jobPayload);
      dispatchedJobsCount++;
    }

    // 3. فحوصات عامة للثغرات (سيتم إرسالها دائمًا في هذا المثال)
    // في المستقبل، يمكن أن تكون هذه أكثر ذكاءً وتعتمد على نقاط الإدخال المكتشفة
    await sqliQueue.add('sqli-check-job', jobPayload);
    dispatchedJobsCount++;
    await xssQueue.add('xss-check-job', jobPayload);
    dispatchedJobsCount++;

    console.log(`[Orchestrator] Dispatched a total of ${dispatchedJobsCount} specialized jobs.`);
    // --- نهاية منطق التنسيق ---

    // تحديث الفحص الرئيسي وتخزين البصمة
    await prisma.scan.update({
      where: { id: scanId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        technologyFingerprint: fingerprint as any,
      },
    });

    console.log(`[Orchestrator] Successfully finished orchestration for scan ID: ${scanId}`);

  } catch (error) {
    let errorMessage = 'An unknown error occurred during orchestration';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error(`[Orchestrator] Failed scan orchestration for ID: ${scanId}. Error:`, errorMessage);

    await prisma.scan.update({
      where: { id: scanId },
      data: { status: 'FAILED', completedAt: new Date() },
    });
    throw error;
  }
};

/**
 * دالة مساعدة لتحليل استجابة HTTP واستخراج بصمات التكنولوجيا.
 */
function analyzeResponse(response: AxiosResponse): TechnologyFingerprint {
  const fingerprint: TechnologyFingerprint = {};
  const headers = response.headers;
  const body = response.data;

  if (headers['server']) fingerprint.server = headers['server'];
  if (headers['x-powered-by']) fingerprint.poweredBy = headers['x-powered-by'];
  if (headers['set-cookie']) fingerprint.cookies = Array.isArray(headers['set-cookie']) ? headers['set-cookie'] : [headers['set-cookie']];

  if (typeof body === 'string') {
    const metaGenerators = body.match(/<meta\s+name=["']generator["']\s+content=["']([^"']+)["']/gi);
    if (metaGenerators) {
      fingerprint.metaGenerators = metaGenerators.map(tag => tag.match(/content=["']([^"']+)["']/i)?.[1] || 'unknown');
    }
    const detectedFrameworks: string[] = [];
    if (body.includes('/wp-content/')) detectedFrameworks.push('WordPress');
    if (body.includes('sites/default/files')) detectedFrameworks.push('Drupal');
    if (body.includes('__NEXT_DATA__')) detectedFrameworks.push('Next.js');
    if (detectedFrameworks.length > 0) fingerprint.detectedFrameworks = [...new Set(detectedFrameworks)];
  }
  return fingerprint;
}
