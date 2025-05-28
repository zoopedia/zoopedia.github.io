import { cpSync, readdirSync } from "fs";
import { basename, extname } from "path";

let count = 0;

for (var x = 0; x < 3; x++) {
  readdirSync(`raw/animals/30${x}`).forEach((name) => {
    console.log(name);
    const nameParts = basename(name, extname(name))
      .split(/(?=[A-Z])/)
      .map((part) => part.toLowerCase());
    nameParts.push(nameParts.shift());
    console.log(name, nameParts);

    const newName = nameParts.join("");
    const oldPath = `raw/animals/30${x}/${name}`;
    const newPath = `images/animal/${newName}.png`;
    cpSync(oldPath, newPath);
  });
}
