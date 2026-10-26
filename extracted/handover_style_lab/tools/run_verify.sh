#!/usr/bin/env bash
# 观澜 Style Lab · 自检启动脚本
# 用法：bash tools/run_verify.sh
set -e

HERE="$(cd "$(dirname "$0")" && pwd)"

# 1) Node
NODE_BIN="${NODE_BIN:-C:/Users/etyph/.workbuddy/binaries/node/versions/22.22.2-6/node.exe}"
if [ ! -x "$NODE_BIN" ]; then NODE_BIN="$(command -v node || true)"; fi
if [ -z "$NODE_BIN" ]; then echo "[ENV] 找不到 node，请安装 Node 18+ 或设置 NODE_BIN"; exit 2; fi

# 2) playwright-core
export NODE_PATH="${NODE_PATH:-C:/Users/etyph/.workbuddy/binaries/node/workspace/node_modules}"

# 3) Chrome
export CHROME_PATH="${CHROME_PATH:-C:/Users/etyph/.agent-browser/browsers/chrome-152.0.7977.82/chrome.exe}"

echo "node:   $NODE_BIN"
echo "chrome: $CHROME_PATH"
echo ""

"$NODE_BIN" "$HERE/verify.cjs"
