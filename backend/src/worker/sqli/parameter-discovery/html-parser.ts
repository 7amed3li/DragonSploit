/**
 * DragonSploit - HTML Form Parser
 * Extracts form parameters and injection points from HTML responses
 */

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

    return forms;
}
