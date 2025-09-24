import fs from "fs";

fs.writeFile("test.txt", "Bonjour, ceci est un test d'écriture avec Node.js", (err) => {
  if (err) {
    console.error("Erreur d'écriture :", err);
    return;
  }
  console.log("✅ Fichier créé et texte écrit avec succès !");

 
  fs.readFile("test.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Erreur de lecture :", err);
      return;
    }
    console.log("📖 Contenu du fichier :", data);
  });
});
