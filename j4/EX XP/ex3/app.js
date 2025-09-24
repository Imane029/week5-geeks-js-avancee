const { readFile, writeFile } = require("./fileManager");
const fs = require("fs");


if (!fs.existsSync("Hello World.txt")) {
  fs.writeFileSync("Hello World.txt", "Hello World !!", "utf-8");
  console.log("Fichier 'Hello World.txt' créé automatiquement !");
}


const content = readFile("Hello World.txt");
console.log("Content of Hello World.txt:", content);


writeFile("Bye World.txt", "Writing to the file");
console.log("Content written to Bye World.txt successfully!");

console.log("New content of Bye World.txt:", readFile("Bye World.txt"));
