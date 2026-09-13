#!/usr/bin/env node
// Checks that every non-reserved markdown file under knowledge/ has YAML
// frontmatter with a non-empty `type` field, per OKF v0.2.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "knowledge";
const RESERVED = new Set(["index.md", "log.md"]);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      out.push(...walk(path));
    } else if (entry.endsWith(".md")) {
      out.push(path);
    }
  }
  return out;
}

function frontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : null;
}

const errors = [];

for (const file of walk(ROOT)) {
  const base = file.split(/[\\/]/).pop();
  const content = readFileSync(file, "utf8");
  const fm = frontmatter(content);

  if (!fm) {
    errors.push(`${file}: missing YAML frontmatter`);
    continue;
  }

  if (RESERVED.has(base)) continue;

  if (!/^type:\s*\S+/m.test(fm)) {
    errors.push(`${file}: frontmatter is missing a non-empty \`type\` field`);
  }
}

if (errors.length > 0) {
  console.error("OKF conformance check failed:\n");
  for (const err of errors) console.error(`  - ${err}`);
  process.exit(1);
}

console.log(`OKF conformance check passed (${walk(ROOT).length} files checked).`);
