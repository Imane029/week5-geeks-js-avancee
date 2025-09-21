const readline = require("readline");

function waitForSeconds(seconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("success");
        }, seconds * 1000); 
    });
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter number of seconds to wait: ", (answer) => {
    const seconds = Number(answer);

    waitForSeconds(seconds)
        .then(result => console.log(`After ${seconds} seconds: ${result}`))
        .finally(() => rl.close());
});
