# Contributing to the TypeScript Knowledge Bundle

This document defines the authoring rules for the bundle. Following them keeps
the content conformant with [OKF v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
and keeps CI green.

## Bundle structure

This repository *is* the bundle — its root is the OKF bundle root. Everything
in it follows the OKF rules, with one deliberate exception (below):

- `index.md` and `log.md` at the repo root are **reserved filenames**.
  `index.md` is the directory listing for that level (progressive
  disclosure); `log.md` is the chronological changelog. Never put concept
  content in a file named either of those.
- Topics are directories at the repo root (for example `introduction/`).
  Each topic directory has its own reserved `index.md` listing the concepts
  inside it, and may have its own `log.md` if it needs one.
- Every other `.md` file under a topic directory is a **concept** and must
  start with YAML frontmatter that includes a non-empty `type` field.
- **Exception:** `README.md`, `CONTRIBUTING.md` (this file), and any other
  `.md` file living directly at the repo root outside a topic directory are
  ordinary repository documents, not OKF concepts. They intentionally carry
  no OKF frontmatter and are excluded from `scripts/validate-okf.mjs`.

## Adding a topic

1. Create a directory at the repo root, e.g. `introduction/`.
2. Add an `index.md` inside it with `title` and `description` frontmatter,
   listing the concepts that will live in that topic.
3. Link the new topic from the root [`index.md`](index.md).
4. Add an entry to [`log.md`](log.md) describing what was added, dated
   `YYYY-MM-DD`.

## Adding a concept

1. Pick a `type`: `Concept`, `Guide`, `Reference`, or `Exercise` (or another
   value if none fit — OKF permits custom types).
2. Copy the matching skeleton from `templates/` into the topic directory and
   rename it to a kebab-case slug, e.g. `introduction/what-is-typescript.md`.
3. Fill in the frontmatter and body sections.
4. Put any code in `assets/code-snippets/<slug>/` as real `.ts` files and
   embed or link them from the markdown.
5. Put any diagrams in `assets/images/` named `<slug>-<n>.svg` or `.png`.
6. Link the concept from its topic's `index.md`.

## Frontmatter schema

```yaml
---
type: Concept | Guide | Reference | Exercise
title: Human readable title
description: One-sentence summary
tags: []
status: draft | stable | deprecated   # optional
---
```

Unknown or additional fields are allowed — OKF consumers must preserve them —
but keep the four above on every concept.

## Cross-linking

Link between concepts with **absolute, bundle-relative paths** rooted at the
repo root, e.g. `/introduction/what-is-typescript.md`. This is the OKF
recommendation and keeps links stable if files move within a topic.

## Code snippets

- Snippets live in `assets/code-snippets/<slug>/` and must compile under the
  strict `tsconfig.json` in that folder. CI runs `tsc --noEmit` over all of
  them.
- One idea per file. Name files after what they demonstrate:
  `narrowing-with-in-operator.ts`, not `example1.ts`.
- When a snippet is meant to show a compile error, mark the offending line
  with `// @ts-expect-error` and a comment explaining the error. This keeps CI
  green while documenting the failure.
- Embed snippets in markdown as fenced `ts` blocks and add a link to the
  source file directly below the block so readers can open the runnable
  version.

## Images

- Prefer SVG for diagrams; PNG for screenshots.
- File name: `<slug>-<n>.<ext>`, e.g. `structural-typing-1.svg`.
- Always include descriptive alt text.
- Reference with an absolute, bundle-relative path, e.g.
  `/assets/images/structural-typing-1.svg`.

## Naming and style

- Folder and file names are kebab-case.
- Use ATX headings (`#`), start body content at `##`; the `#` title comes from
  frontmatter.
- Wrap prose at roughly 80 columns for readable diffs. Tables and links may
  exceed this.
- Write in second person ("you") and present tense.

## Source material

- Content is authored from primary notes/recordings kept outside the
  repository. Once a concept's content has been transcribed into its
  markdown file, delete the source recording rather than committing it.
- Do not reference the origin of the material (course, instructor, video
  file name, etc.) in the content, commit messages, or PR descriptions —
  describe the topic itself, not where it came from.

## Commits

Use conventional prefixes: `content:` for knowledge units, `assets:` for
snippets/images, `chore:` for tooling and structure, `fix:` for corrections.
