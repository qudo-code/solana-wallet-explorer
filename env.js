// SvelteKit works best when reading environment variables from a .env file.
// This file values from the current environment and writes them to /build/.env
import fs from "fs";
import path from "path";

const nemesisEnv = Object.entries(process.env).reduce((acc, [ key, value ]) => (key.startsWith("ENV") ? `${acc}${key}=${value}\n` : acc), "");

const outPath = path.join(process.cwd(), ".env");

// eslint-disable-next-line no-console
console.log("Writing to .env");
// eslint-disable-next-line no-console
console.log(nemesisEnv);
 
fs.writeFileSync(outPath, nemesisEnv);
