// post-x-promote-make-your-own-bounty-01 — entry program (Node 22, standard library only).
//
// The X post is the entry. This program only carries the post's address to the
// grader: it reads POST.json from the repository root, checks that it parses as
// a JSON object with a string `url` field, and writes those exact bytes to the
// output directory. No network, no clock, no files outside the repository, so
// two runs on the same commit write the same bytes.
//
// Local run (mirrors the grader):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const repoDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const raw = readFileSync(join(repoDir, "POST.json"), "utf8");

let parsed: unknown;
try {
  parsed = JSON.parse(raw);
} catch {
  console.error("POST.json is not valid JSON");
  process.exit(1);
}

if (
  typeof parsed !== "object" ||
  parsed === null ||
  typeof (parsed as { url?: unknown }).url !== "string"
) {
  console.error('POST.json must be a JSON object with a string "url" field');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "POST.json"), raw);
