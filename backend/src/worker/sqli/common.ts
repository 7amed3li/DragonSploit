import axios from 'axios';
import { PrismaClient, Severity, VulnerabilityType } from '@prisma/client';
import { URL } from 'url';

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function executeRequest(urlToTest: string): Promise<{ response: any, responseTime: number, responseBody: string, responseLength: number }> {
    const startTime = Date.now();
    const response = await axios.get(urlToTest, {
        timeout: 15000,
        headers: { 'User-Agent': 'DragonSploit/2.0' },
        validateStatus: () => true,
    });
    const responseTime = Date.now() - startTime;
    const responseBody = (typeof response.data === 'string' || Buffer.isBuffer(response.data))
        ? response.data.toString()
        : JSON.stringify(response.data);
    const responseLength = responseBody.length;

    return { response, responseTime, responseBody, responseLength };
}

export async function recordVulnerability(prisma: PrismaClient, scanId: string, type: VulnerabilityType, severity: Severity, description: string, proof: string): Promise<void> {
    try {
        await prisma.vulnerability.create({
            data: { scanId, type, severity, description, proof },
        });
        console.log("✅ Vulnerability recorded.");
    } catch (error: any) {
        console.error(`❌ Failed to record vulnerability: ${error.message}`);
    }
}

export const COMMON_FALLBACK_PARAMS = ['id', 'q', 'search', 'query', 'page', 'category', 'item', 'view'];
export const BASIC_ERROR_PAYLOADS = ["'", '"', "1'"];
export const TIME_DELAY_THRESHOLD = 4000;
export const MAX_ATTEMPTS_PER_PARAM = 7;