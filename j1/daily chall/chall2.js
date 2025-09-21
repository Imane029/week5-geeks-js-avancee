const readline = require("readline");

const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`;


function toJs() {
    return new Promise((resolve, reject) => {
        const obj = JSON.parse(morse);
        if (Object.keys(obj).length === 0) reject("Morse object is empty!");
        else resolve(obj);
    });
}

function toMorse(morseJS) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        rl.question("Enter a word or sentence: ", (input) => {
            rl.close();
            const letters = input.toLowerCase().split("");
            const morseArr = [];
            for (let char of letters) {
                if (!morseJS[char]) {
                    reject(`Character "${char}" not found in Morse code`);
                    return;
                }
                morseArr.push(morseJS[char]);
            }
            resolve(morseArr);
        });
    });
}

function joinWords(morseArr) {
    console.log(morseArr.join("\n"));
}


toJs()
  .then(obj => toMorse(obj))
  .then(morseArr => joinWords(morseArr))
  .catch(err => console.log(err));
