---
draft: true 
permalink: mcp-sse-the-hard-way
---

Based on <https://deadprogrammersociety.com/2025/03/calling-mcp-servers-the-hard-way.html>.

In one terminal:
```
➜ curl http://127.0.0.1:64342/sse                                                            
data: /message?sessionId=41d13160-1698-420c-b5d3-3f925ac5c019
event: endpoint
```

In another terminal (copying session id from above):
```
➜ MCP_ENDPOINT=http://127.0.0.1:64342/message?sessionId=41d13160-1698-420c-b5d3-3f925ac5c019
➜ curl -X POST "${MCP_ENDPOINT}" -H "Content-Type: application/json" -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
        "name": "get_file_problems",
        "arguments": {
            "errorsOnly": false,
            "filePath": "pro/ai/mcp/client/src/main/kotlin/org/http4k/ai/mcp/client/McpClient.kt"
        }
    }
}'
Accepted%
```

The first terminal shows the response:
```
data: {"id":1,"jsonrpc":"2.0","result":{"content":[{"text":"{\"filePath\":\"pro/ai/mcp/client/src/main/kotlin/org/http4k/ai/mcp/client/McpClient.kt\",\"errors\":[{\"severity\":\"WARNING\",\"description\":\"Function \\\"staaop\\\" is never used\",\"lineContent\":\"    fun staaop() = close()\",\"line\":29,\"column\":9}]}","type":"text"}],"isError":false,"_meta":{}}}
event: message
```