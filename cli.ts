#!/usr/bin/env node

import { createServer } from "node:http"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { parseArgs } from "node:util"
import next from "next"
import packageJson from "./package.json"

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

const isBuilt = __filename.includes("/build/")

/**
 * ビルド後（build/cli.js）の場合のみ親ディレクトリを指定
 * 開発時（cli.ts）は process.cwd() が使われる
 */
const _dir = isBuilt ? join(__dirname, "..") : undefined

const help = `Usage:
  hello [options]

Options:
  -p, --port <port>      Port number (default: 3000)
  -m, --message <text>   Message to display (default: "Hello, World!")
  -h, --help             Show help
  -v, --version          Show version

Examples:
  hello                              Start server with defaults
  hello -p 8080                      Start server on port 8080
  hello -m "Welcome!"                Start server with custom message
  hello -p 8080 -m "Custom message"  Start server with custom port and message`

const args = parseArgs({
  args: process.argv.slice(2),
  strict: false,
  options: {
    help: { type: "boolean", short: "h" },
    version: { type: "boolean", short: "v" },
    port: { type: "string", short: "p" },
    message: { type: "string", short: "m" },
  },
})

if (args.values.help) {
  console.log(help)
  process.exit(0)
}

if (args.values.version) {
  console.log(packageJson.version)
  process.exit(0)
}

const port =
  typeof args.values.port === "string"
    ? Number.parseInt(args.values.port, 10)
    : 3000

const hostname = "localhost"

process.env.CLI_MESSAGE =
  typeof args.values.message === "string"
    ? args.values.message
    : "Hello, World!"

const app = next({
  dev: false,
  hostname,
  port,
  ...(_dir && { dir: _dir }),
})

const handle = app.getRequestHandler()

await app.prepare()

const server = createServer(handle)

server.listen(port, () => {
  console.log(`> Server listening at http://${hostname}:${port}`)
})
