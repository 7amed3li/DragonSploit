/**
 * DragonSploit - HTML Form Parser
 * Extracts form parameters and injection points from HTML responses
 */

import { URL } from 'url';

export interface FormInput {
    name: string;
    type: string;
    value?: string;
}

export interface DiscoveredForm {
    action: string;
    method: string;
    inputs: FormInput[];
}

/**
 * Extracts all forms and their inputs from an HTML string using Regex.
 * Note: Regex is used here for performance and to avoid heavy DOM dependencies.
 */
export function extractForms(html: string, baseUrl: string): DiscoveredForm[] {
    const forms: DiscoveredForm[] = [];

    // Regex to find <form> tags
    const formRegex = /<form\s+([^>]*?)>(.*?)<\/form>/gis;
    let formMatch;

    while ((formMatch = formRegex.exec(html)) !== null) {
        const attributes = formMatch[1] || '';
        const innerHtml = formMatch[2] || '';

        // Extract action
        const actionMatch = attributes.match(/action=["']([^"']*)["']/i);
        let action = actionMatch ? actionMatch[1] : '';

        // Resolve relative URLs
        if (action && !action.startsWith('http')) {
            try {
                const base = new URL(baseUrl);
                if (action.startsWith('/')) {
                    action = `${base.protocol}//${base.host}${action}`;
                } else {
                    // Simple join (could be improved)
                    action = `${baseUrl.replace(/\/$/, '')}/${action}`;
                }
            } catch (e) {
                // Invalid base URL, keep action as is
            }
        } else if (!action) {
            action = baseUrl; // Submit to self if no action
        }

        // Extract method
        const methodMatch = attributes.match(/method=["']([^"']*)["']/i);
        const method = methodMatch ? methodMatch[1].toUpperCase() : 'GET';

        // Extract inputs
        const inputs: FormInput[] = [];
        const inputRegex = /<input\s+([^>]*?)>/gi;
        let inputMatch;

        while ((inputMatch = inputRegex.exec(innerHtml)) !== null) {
            const inputAttrs = inputMatch[1] || '';

            const nameMatch = inputAttrs.match(/name=["']([^"']*)["']/i);
            const typeMatch = inputAttrs.match(/type=["']([^"']*)["']/i);
            const valueMatch = inputAttrs.match(/value=["']([^"']*)["']/i);

            if (nameMatch && nameMatch[1]) {
                inputs.push({
                    name: nameMatch[1],
                    type: (typeMatch && typeMatch[1]) ? typeMatch[1].toLowerCase() : 'text',
                    value: (valueMatch && valueMatch[1]) ? valueMatch[1] : ''
                });
            }
        }

        forms.push({ action, method, inputs });
    }

    return forms;
}
