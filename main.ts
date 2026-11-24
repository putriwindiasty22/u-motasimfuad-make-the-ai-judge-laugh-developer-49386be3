// Make the AI Judge Laugh: Developer Excuses
// Writes one funny single-line developer excuse to /output/entry.txt
// (or ./output/entry.txt when run locally). Node 22, no dependencies.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The code worked fine until production read the comment where I wrote 'TODO: fix this before anyone notices'.";

const MAX = 200;

function main(): void {
  const line = LINE.trim();
  if (line.length === 0) {
    throw new Error("refusing to write a blank entry");
  }
  if (line.length > MAX) {
    throw new Error(`entry is ${line.length} characters, over the ${MAX} limit`);
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  const outDir = process.env.OUTPUT_DIR ?? (existsSync("/output") ? "/output" : "./output");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line + "\n", "utf8");
  console.log(`wrote ${line.length} characters to ${join(outDir, "entry.txt")}`);
}

main();
