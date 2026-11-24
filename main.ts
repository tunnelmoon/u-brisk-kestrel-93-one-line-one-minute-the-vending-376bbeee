import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Excuse me, you're the only snack in here I can't vend. Press B4 and I'll fall for you anyway.";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line must be 1 to 200 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dst = join(outDir, "entry.txt");
writeFileSync(dst, LINE, "utf8");
// Self-check: what was written must read back exactly as the line.
if (readFileSync(dst, "utf8") !== LINE) {
  throw new Error(`write mismatch: ${dst} does not match the line`);
}
console.log(`wrote ${dst} (${LINE.length} chars)`);
