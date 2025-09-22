const form = document.getElementById('gifForm');
const gifContainer = document.getElementById('gifContainer');
const deleteAllBtn = document.getElementById('deleteAll');
const API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const category = document.getElementById('category').value.trim();
  if (!category) return alert("Veuillez saisir une catégorie");

  try {
    const url = `https://api.giphy.com/v1/gifs/random?tag=${category}&api_key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erreur lors de la récupération du GIF");
    
    const data = await response.json();
    const gifUrl = data.data.images.fixed_height.url;

    
    const gifDiv = document.createElement('div');
    gifDiv.classList.add('gifItem');

    const img = document.createElement('img');
    img.src = gifUrl;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "DELETE";
    deleteBtn.classList.add('deleteBtn');

    deleteBtn.addEventListener('click', () => {
      gifDiv.remove();
    });

    gifDiv.appendChild(img);
    gifDiv.appendChild(deleteBtn);
    gifContainer.appendChild(gifDiv);

  } catch (error) {
    alert(error.message);
  }

  form.reset();
});


deleteAllBtn.addEventListener('click', () => {
  gifContainer.innerHTML = "";
});
