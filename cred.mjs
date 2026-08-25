import { spawn } from "node:child_process";

function credentialFill() {
  return new Promise((resolve, reject) => {
    const p = spawn("git", ["credential", "fill"], { stdio: ["pipe", "pipe", "pipe"] });
    p.stdin.write("protocol=https\nhost=github.com\n");
    p.stdin.end();
    let out = "";
    p.stdout.on("data", (d) => (out += d));
    p.stderr.on("data", () => {});
    p.on("close", () => resolve(out));
  });
}

const out = await credentialFill();
const lines = out.split("\n");
const user = lines.find((l) => l.startsWith("username="))?.slice(9);
const pass = lines.find((l) => l.startsWith("password="))?.slice(9);

if (!pass) {
  console.log("NO_GITHUB_CREDENTIAL");
  process.exit(0);
}

console.log("GITHUB_LOGIN:", user);
console.log("TOKEN_PREFIX:", pass.slice(0, 4) + "...");

const me = await fetch("https://api.github.com/user", {
  headers: { Authorization: `Bearer ${pass}`, "User-Agent": "noop" },
});
const data = await me.json();
console.log("API_USER:", data.login, "API_OK:", me.ok);

const repo = await fetch("https://api.github.com/repos/andaeseong/testthoitrang", {
  headers: { Authorization: `Bearer ${pass}`, "User-Agent": "noop" },
});
const rdata = await repo.json();
console.log("REPO_OK:", repo.ok, "CURRENT_HOMEPAGE:", rdata.homepage || "(none)");
process.exit(0);
