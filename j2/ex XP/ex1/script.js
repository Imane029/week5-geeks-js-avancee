const url = "https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

fetch(url)
  .then(response => {
    if (!response.ok) throw new Error("Erreur HTTP : " + response.status);
    return response.json();
  })
  .then(data => {
    data.data.forEach((gif, index) => {
      console.log(`${index + 1}: ${gif.images.original.url}`);
    });
  })
  .catch(error => console.error("Erreur attrapée :", error));
