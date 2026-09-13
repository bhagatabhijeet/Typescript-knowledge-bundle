---
type: Guide
title: Setting Up Your Development Environment
description: Install Node.js and the TypeScript compiler, and pick an editor.
tags:
  - typescript
  - setup
  - tooling
status: stable
---

## Goal

By the end of this guide you'll have the TypeScript compiler installed and
verified, ready to write and compile your first program.

## Before you start

- A computer with internet access. That's it.

## Steps

### 1. Install Node.js

The TypeScript compiler is distributed as an npm package, so you need
[Node.js](https://nodejs.org) installed first — it ships with npm, the Node
Package Manager, which is what you'll use to install TypeScript itself. If
you don't already have it, download the latest version from the Node.js
site.

### 2. Install the TypeScript compiler

Open a terminal and run:

```sh
npm i -g typescript
```

- `i` is short for `install`.
- `-g` installs it **globally**, so the TypeScript compiler is available in
  every folder, not just one project.
- `typescript` is the name of the package.

On macOS or Linux, if this fails with a permission error, prefix the command
with `sudo` (short for "superuser do"):

```sh
sudo npm i -g typescript
```

### 3. Verify the install

```sh
tsc -v
```

`tsc` is short for **TypeScript compiler**. This should print the installed
version, e.g. `Version 4.6.3` — if you see a newer version, that's fine;
everything in this bundle applies to newer TypeScript releases too.

### 4. Pick an editor

Any code editor works, but [Visual Studio Code](https://code.visualstudio.com/)
has particularly strong built-in TypeScript support — inline type errors,
completion, and refactoring — which makes the rest of this bundle smoother
to follow.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Permission error running `npm i -g typescript` on macOS/Linux | Global npm installs need elevated permissions | Prefix the command with `sudo` |
| `tsc: command not found` after installing | npm's global bin directory isn't on your `PATH` | Reinstall Node.js from nodejs.org (it configures `PATH` for you), or add npm's global bin directory to `PATH` manually |

## Next steps

- [Your First TypeScript](/introduction/your-first-typescript.md) — write
  and compile your first `.ts` file.
