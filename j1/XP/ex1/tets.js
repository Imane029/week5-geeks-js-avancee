const readline = require("readline");

function compareToTen(num) {
    return new Promise((resolve, reject) => {
        if (num < 10) {
            resolve(`${num} is less than 10`);
        } else if (num === 10) {
            resolve(`${num} is equal to 10`);
        } else {
            reject(`${num} is greater than 10`);
        }
    });
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter a number to compare with 10: ", (answer) => {
    const number = Number(answer);

    compareToTen(number)
        .then(result => console.log(result))
        .catch(error => console.log(error))
        .finally(() => rl.close());
});
