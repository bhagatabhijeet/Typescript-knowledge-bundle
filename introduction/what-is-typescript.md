---
type: Concept
title: What Is TypeScript?
description: What TypeScript is, how it relates to JavaScript, and why it exists.
tags:
  - typescript
  - fundamentals
status: stable
---

## What it is

TypeScript is a programming language created at Microsoft to address some of
JavaScript's rough edges. Technically, it's built directly on top of
JavaScript: every valid JavaScript file is already a valid TypeScript file.
TypeScript layers extra features on top so you can build larger, more
reliable applications in less time — and because it compiles down to
JavaScript, you can use it anywhere JavaScript runs, on the front end or the
back end.

![How TypeScript relates to JavaScript — a Venn diagram showing JavaScript as a subset of TypeScript, with a list of what TypeScript adds: static typing, compile-time error checking, editor tooling, and early access to upcoming JS features.](/assets/images/js-ts-relationship.svg)

## Why it matters: static typing

The headline feature TypeScript adds is **static typing**. To see why that's
useful, it helps to compare two families of programming languages:

- **Statically typed** languages (C++, C#, Java) know the type of every
  variable at compile time — before the program ever runs. Declare a
  variable as a number, and it can only ever hold a number.
- **Dynamically typed** languages (JavaScript, Python, Ruby) only determine
  a variable's type at runtime, and that type can change. This is flexible,
  but it means a mismatch — say, passing a string into a function that
  expects a number — isn't caught until that exact line of code actually
  executes. Finding it requires either running the application or writing
  tests that exercise the right edge case.

![Statically typed vs. dynamically typed languages — the statically typed side catches a type mismatch at compile time, while the dynamically typed side only discovers it once that line of code runs.](/assets/images/static-vs-dynamic-typing.svg)

TypeScript brings the statically typed style to JavaScript. You declare the
types of your variables and function parameters, the TypeScript compiler
checks your code against those declarations, and it stops you right there if
something doesn't match — at compile time, before you've run anything.

## How it works

Because your editor also knows the type of every variable, TypeScript is
more than just type checking:

- **Code completion and refactoring** improve dramatically, since the
  editor can see exactly what shape a value has and what you can safely do
  with it.
- **Additional language features** on top of plain JavaScript help you write
  cleaner, more concise code.
- **Early access to upcoming JavaScript features.** New JavaScript features
  take time to land in every browser and runtime. TypeScript lets you write
  against tomorrow's JavaScript today, compiling ("transpiling") it down to
  JavaScript that already-shipped environments understand.

## Trade-offs

TypeScript isn't free of cost:

- **A compilation step is required.** Browsers don't run TypeScript
  directly, so your code always has to pass through the TypeScript compiler
  first, which transpiles it into plain JavaScript.
- **It asks for more discipline while coding.** Declaring types up front can
  feel like overhead on a quick script or a solo prototype. For small,
  throwaway code, plain JavaScript may still be the right call. But on any
  project with more than one contributor, or one that's expected to live for
  a while, that upfront discipline tends to save far more time than it
  costs — by catching mistakes at compile time instead of after they ship.

## Key takeaways

- TypeScript is a superset of JavaScript: every `.js` file is valid `.ts`.
- Its core feature is static typing — types are checked at compile time,
  not discovered at runtime.
- It also brings better editor tooling and lets you use upcoming JavaScript
  features early.
- It adds a compilation step and asks for more upfront discipline, which
  pays off most on larger or longer-lived projects.

## Further reading

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
