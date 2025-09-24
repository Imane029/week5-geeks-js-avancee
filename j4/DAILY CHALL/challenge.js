import { greet } from "./greeting.js";
import { colorfulMessage } from "./colorful-message.js";
import { readFileContent } from "./read-file.js";

const name = "Imane";
console.log(greet(name));
colorfulMessage("This is a colorful message with Chalk!");
readFileContent();
