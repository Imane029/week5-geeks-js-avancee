const readline = require("readline");
const _ = require("lodash");
const math = require("./math"); 

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter the first number: ", (num1) => {
  rl.question("Enter the second number: ", (num2) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    rl.question("Choose operation (add/multiply): ", (op) => {
      if (op === "add") {
        console.log(`Result: ${a} + ${b} = ${math.add(a, b)}`);
      } else if (op === "multiply") {
        console.log(`Result: ${a} * ${b} = ${math.multiply(a, b)}`);
      } else {
        console.log("⚠️ Invalid operation!");
      }

      console.log("Sum with lodash:", _.sum([a, b]));

      rl.close();
    });
  });
});
