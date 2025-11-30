import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAiTools } from "./tools/ai-tools";

/**
 * Create and configure the MCP server instance
 */
export const createMcpServer = () => {
    const server = new McpServer({
        name: "DragonSploit Backend",
        version: "1.0.0"
    });

    // Register tools
    registerAiTools(server);

    return server;
};
