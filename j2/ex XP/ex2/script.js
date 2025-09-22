const fetch = require("node-fetch"); 

const url2 = "https://api.giphy.com/v1/gifs/search?q=sun&limit=10&offset=2&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

fetch(url2)
  .then(response => {
    if (!response.ok) throw new Error("Erreur HTTP : " + response.status);
    return response.json();
  })
  .then(data => {
    console.log("Résultat Exercice 2 :");
    data.data.forEach((gif, i) => {
      console.log(`${i + 1}: ${gif.images.original.url}`);
    });
  })
  .catch(error => console.error("Erreur :", error));
