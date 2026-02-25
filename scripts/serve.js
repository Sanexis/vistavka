const net = require("node:net");
const path = require("node:path");
const { spawn } = require("node:child_process");

const START_PORT = Number(process.env.PORT || 5173);
const MAX_PORT_TRIES = 30;

function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once("error", () => {
      resolve(false);
    });

    server.once("listening", () => {
      server.close(() => resolve(true));
    });

    server.listen(port, "0.0.0.0");
  });
}

async function findAvailablePort(startPort) {
  for (let offset = 0; offset < MAX_PORT_TRIES; offset += 1) {
    const port = startPort + offset;
    if (await isPortFree(port)) return port;
  }

  throw new Error(
    `No free port in range ${startPort}-${startPort + MAX_PORT_TRIES - 1}`,
  );
}

async function run() {
  const port = await findAvailablePort(START_PORT);

  if (port !== START_PORT) {
    process.stdout.write(
      `Port ${START_PORT} занят, запускаю сервер на ${port}\n`,
    );
  }

  const serverBin = path.join(
    process.cwd(),
    "node_modules",
    ".bin",
    process.platform === "win32" ? "http-server.cmd" : "http-server",
  );

  const child = spawn(serverBin, [".", "-p", String(port), "-c-1"], {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  child.on("exit", (code) => {
    process.exit(code ?? 0);
  });
}

run().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
});
