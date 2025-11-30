import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AIProvider, AIContext } from "../../services/ai-provider";

/**
 * Register AI-related tools with the MCP server
 */
export function registerAiTools(server: McpServer) {
    server.tool(
        "generate_sql_payload",
        {
            feedback: z.string().describe("Feedback from previous injection attempt (HTTP response, errors, etc.)"),
            vector: z.string().optional().describe("Attack vector (e.g., id, search, login)"),
            parameter: z.string().optional().describe("Target parameter name"),
            fingerprint: z.any().optional().describe("Target database fingerprint info (server, db type, etc.)")
        },
        async ({ feedback, vector, parameter, fingerprint }) => {
            try {
                // Build context object without undefined properties (exactOptionalPropertyTypes compliance)
                const context: AIContext = {};
                if (vector !== undefined) context.vector = vector;
                if (parameter !== undefined) context.parameter = parameter;
                if (fingerprint !== undefined) context.fingerprint = fingerprint;

                const result = await AIProvider.getPayload(feedback, context);

                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(result, null, 2)
                        }
                    ]
                };
            } catch (error: any) {
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({ error: error.message })
                        }
                    ],
                    isError: true
                };
            }
        }
    );
}
