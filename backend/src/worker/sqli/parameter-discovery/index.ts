/**
 * DragonSploit - Parameter Discovery Engine
 * Identifies all potential injection points (GET, POST, JSON, Headers)
 */

import { URL } from 'url';
import { extractForms } from './html-parser';

export interface InjectionPoint {
    type: 'GET' | 'POST' | 'JSON' | 'HEADER' | 'COOKIE';
    name: string;
    value: string;
    url: string;
    method: string;
    contentType?: string;
}

export class ParameterDiscovery {

    /**
     * Discovers all potential injection points from a given URL and its response body.
     */
    static discover(targetUrl: string, responseBody: string): InjectionPoint[] {
        const points: InjectionPoint[] = [];
        const urlObj = new URL(targetUrl);

        // 1. GET Parameters from URL
        urlObj.searchParams.forEach((value, key) => {
            points.push({
                type: 'GET',
                name: key,
                value: value,
                url: targetUrl,
                method: 'GET'
            });
        });

        // 2. POST Parameters from HTML Forms
        const forms = extractForms(responseBody, targetUrl);
        for (const form of forms) {
            for (const input of form.inputs) {
                // Skip submit buttons and hidden fields if needed, but usually we test them all
                points.push({
                    type: 'POST',
                    name: input.name,
                    value: input.value || 'test',
                    url: form.action,
                    method: form.method,
                    contentType: 'application/x-www-form-urlencoded'
                });
            }
        }

        // 3. JSON Detection (Simple heuristic)
        // If the response looks like JSON, we might be dealing with an API
        // This is a bit speculative for *response* analysis, but useful for context
        if (responseBody.trim().startsWith('{') && responseBody.trim().endsWith('}')) {
            try {
                const json = JSON.parse(responseBody);
                this.extractJsonKeys(json, points, targetUrl);
            } catch (e) {
                // Not valid JSON, ignore
            }
        }

        return points;
    }

    /**
     * Recursively extracts keys from a JSON object as potential injection points
     */
    private static extractJsonKeys(obj: any, points: InjectionPoint[], url: string, prefix = '') {
        for (const key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                this.extractJsonKeys(obj[key], points, url, prefix + key + '.');
            } else {
                points.push({
                    type: 'JSON',
                    name: prefix + key,
                    value: String(obj[key]),
                    url: url,
                    method: 'POST', // Assume POST for JSON APIs usually
                    contentType: 'application/json'
                });
            }
        }
    }
}
