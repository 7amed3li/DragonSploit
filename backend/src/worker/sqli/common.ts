import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { PrismaClient, Severity, VulnerabilityType } from '@prisma/client';
import http from 'http';
import https from 'https';

// ============================================================================
// ⚙️ CONFIGURATION & CONSTANTS
// ============================================================================

// Common utilities for SQL Injection vectors

export const COMMON_FALLBACK_PARAMS = ['id', 'q', 'search', 'query', 'page', 'category', 'item', 'view'];
export const BASIC_ERROR_PAYLOADS = ["'", '"', "1'"];
export const TIME_DELAY_THRESHOLD = 4000;
export const MAX_ATTEMPTS_PER_PARAM = 7;

const REQUEST_TIMEOUT = 15000;
const USER_AGENT = 'DragonSploit/2.0 (Security Scanner)';

// 🚀 PERFORMANCE BOOST: Shared Keep-Alive Agents (Global Pool)
export const httpAgent = new http.Agent({
    keepAlive: true,
    maxSockets: 100,
    maxFreeSockets: 10,
    timeout: 60000
});

export const httpsAgent = new https.Agent({
    keepAlive: true,
    maxSockets: 100,
    maxFreeSockets: 10,
    rejectUnauthorized: false, // Ignore SSL errors for security scanning
    timeout: 60000
});

// ============================================================================
// 🛠️ UTILITIES
// ============================================================================

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export interface RequestResult {
    response: AxiosResponse<any> | null;
    responseTime: number;
    responseBody: string;
    responseLength: number;
    status: number;
    error?: string;
}

/**
 * Executes an HTTP request with production-grade resilience.
 * Uses the global shared agents for maximum efficiency.
 * Supports GET, POST, PUT, etc. via config.
 */
export async function executeRequest(urlToTest: string, config: AxiosRequestConfig = {}): Promise<RequestResult> {
    const startTime = Date.now();

    // Auto-detect content type if data is present but header is missing
    const headers: any = { 'User-Agent': USER_AGENT, ...config.headers };
    if (config.data && !headers['Content-Type']) {
        if (typeof config.data === 'object') {
            headers['Content-Type'] = 'application/json';
        } else if (typeof config.data === 'string' && config.data.includes('=')) {
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
    }

    // Merge settings
    const requestConfig: AxiosRequestConfig = {
        url: urlToTest,
        method: 'GET', // Default
        timeout: REQUEST_TIMEOUT,
        validateStatus: () => true,
        httpAgent: httpAgent,
        httpsAgent: httpsAgent,
        ...config,
        headers // Use enhanced headers
    };

    try {
        const response = await axios(requestConfig);
        const responseTime = Date.now() - startTime;

        // Safe body extraction
        let responseBody = '';
        if (response.data) {
            if (typeof response.data === 'string') {
                responseBody = response.data;
            } else if (Buffer.isBuffer(response.data)) {
                responseBody = response.data.toString('utf-8');
            } else {
                responseBody = JSON.stringify(response.data);
            }
        }

        return {
            response,
            responseTime,
            responseBody,
            responseLength: responseBody.length,
            status: response.status
        };

    } catch (error: any) {
        // 🛡️ NETWORK ERROR HANDLING
        const responseTime = Date.now() - startTime;
        return {
            response: null,
            responseTime,
            responseBody: '',
            responseLength: 0,
            status: 0,
            error: error.message
        };
    }
}

/**
 * Detects if a response indicates a WAF block.
 */
export function detectWaf(responseBody: string, statusCode: number): boolean {
    const wafSignatures = [
        'blocked by waf',
        'security violation',
        'firewall',
        'mod_security',
        'sucuri',
        'cloudflare',
        'imperva',
        'incapsula',
        'access denied',
        'forbidden',
        'request rejected'
    ];

    // 403 Forbidden and 406 Not Acceptable are strong indicators
    if (statusCode === 403 || statusCode === 406) {
        // But verify it's not just a standard auth error
        if (!responseBody.toLowerCase().includes('login') && !responseBody.toLowerCase().includes('password')) {
            return true;
        }
    }

    const lowerBody = responseBody.toLowerCase();
    return wafSignatures.some(sig => lowerBody.includes(sig));
}

/**
 * Records a confirmed vulnerability to the database with structured logging.
 */
export async function recordVulnerability(
    prisma: PrismaClient,
    scanId: string,
    type: VulnerabilityType,
    severity: Severity,
    description: string,
    proof: string
): Promise<void> {
    try {
        const safeProof = proof.length > 5000 ? proof.substring(0, 5000) + '...[TRUNCATED]' : proof;

        await prisma.vulnerability.create({
            data: {
                scanId,
                type,
                severity,
                description,
                proof: safeProof
            },
        });

        // JSON Logging for observability (ELK/Splunk ready)
        console.log(JSON.stringify({
            level: 'INFO',
            event: 'VULNERABILITY_RECORDED',
            timestamp: new Date().toISOString(),
            scanId,
            type,
            severity
        }));

    } catch (error: any) {
        console.error(JSON.stringify({
            level: 'ERROR',
            event: 'DB_INSERT_FAILED',
            timestamp: new Date().toISOString(),
            scanId,
            error: error.message
        }));
    }
}