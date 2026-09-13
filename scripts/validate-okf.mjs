#!/usr/bin/env node
// Checks that every non-reserved markdown file in this OKF bundle (the repo
// root) has YAML frontmatter with a non-empty `type` field, per OKF v0.2.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = ".";
const RESERVED = new Set(["index.md", "log.md"]);
const EXCLUDED_DIRS = new Set([
  "node_modules",
  ".git",
  ".github",
  "assets",
  "templates",
  "scripts",
]);
// Ordinary repository documents at the bundle root — not OKF concepts.
const ROOT_EXCLUDED_FILES = new Set(["README.md", "CONTRIBUTING.md"]);

function walk(dir, depth = 0) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (depth === 0 && EXCLUDED_DIRS.has(entry)) continue;
    if (depth === 0 && ROOT_EXCLUDED_FILES.has(entry)) continue;

    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      out.push(...walk(path, depth + 1));
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

const files = walk(ROOT);
const errors = [];

for (const file of files) {
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

console.log(`OKF conformance check passed (${files.length} files checked).`);
