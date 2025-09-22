const form = document.getElementById('sunForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name1 = form.name1.value;
  const lat1 = form.lat1.value;
  const lng1 = form.lng1.value;

  const name2 = form.name2.value;
  const lat2 = form.lat2.value;
  const lng2 = form.lng2.value;

  const url1 = `https://api.sunrise-sunset.org/json?lat=${lat1}&lng=${lng1}&formatted=0`;
  const url2 = `https://api.sunrise-sunset.org/json?lat=${lat2}&lng=${lng2}&formatted=0`;

  try {
    
    const [res1, res2] = await Promise.all([fetch(url1), fetch(url2)]);

    if (!res1.ok || !res2.ok) throw new Error("Erreur lors de la récupération des données");

    const data1 = await res1.json();
    const data2 = await res2.json();

   
    resultDiv.innerHTML = `
      <p>${name1} : ${new Date(data1.results.sunrise).toLocaleTimeString()}</p>
      <p>${name2} : ${new Date(data2.results.sunrise).toLocaleTimeString()}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p class="error">Erreur : ${error.message}</p>`;
  }
});
