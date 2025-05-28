import { readFile, writeFile } from "fs/promises";
import nunjucks from "nunjucks";
import { join } from "path";
import * as prettier from "prettier";
import { compileString } from "sass";

import { animals } from "../data/animals.js";

const src = import.meta.dirname;
const root = "docs";
const views = ["templates", "views"].map((dir) => join(src, dir));
const env = nunjucks.configure(views);

async function build() {
  const css = await buildCss();
  await writeFile(join(root, "css/main.css"), css);

  const html = await buildHtml();
  await writeFile(join(root, "index.html"), html);
}

async function buildCss() {
  const sass = await readFile(join(src, "styles/main.scss"));
  const css = compileString(sass.toString()).css;
  return await prettier.format(css, { parser: "css" });
}

async function buildHtml() {
  const html = nunjucks.render("index.njk", { animals });
  return await prettier.format(html, { parser: "html" });
}

env.addFilter("localeString", function (number) {
  return number.toLocaleString();
});

env.addFilter("imageName", function (name) {
  return name.toLowerCase().replaceAll(/[^a-z]/g, "");
});

await build();
