
Promise.resolve(3)
    .then(result => console.log(`Resolved with: ${result}`));


Promise.reject("Boo!")
    .then(result => console.log(result))
    .catch(error => console.log(`Rejected with: ${error}`));
