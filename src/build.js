import { writeFile } from "fs/promises";
import nunjucks from "nunjucks";
import { join } from "path";
import * as prettier from "prettier";

import { animals } from "../data/animals.js";

const src = import.meta.dirname;
const root = "docs";
const views = ["templates", "views"].map((dir) => join(src, dir));
nunjucks.configure(views);

async function build() {
  const html = await buildHtml();
  const path = join(root, "index.html");
  await writeFile(path, html);
}

async function buildHtml() {
  const html = nunjucks.render("index.njk", { animals });
  return await prettier.format(html, { parser: "html" });
}

await build();
