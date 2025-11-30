import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createMcpServer } from "./server";

async function main() {
    const server = createMcpServer();
    const transport = new StdioServerTransport();

    // Connect to transport
    await server.connect(transport);

    console.error("DragonSploit MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in MCP server:", error);
    process.exit(1);
});
