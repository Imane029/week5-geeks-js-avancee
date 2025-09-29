const express = require("express");
const path = require("path");
const helmet = require("helmet");

const app = express();
const PORT = 3000;


app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"], 
      },
    },
  })
);


app.use(express.json());


app.use(express.static(path.join(__dirname, "public")));

// Questions
const questions = [
  {
    id: 1,
    question: "Quel est le langage utilisé avec Node.js ?",
    options: ["Python", "JavaScript", "C#", "PHP"],
    answer: "JavaScript",
  },
  {
    id: 2,
    question: "Express est un framework pour…",
    options: ["Frontend", "Base de données", "Backend", "Mobile"],
    answer: "Backend",
  },
  {
    id: 3,
    question: "Quelle commande démarre un projet Node.js ?",
    options: ["npm start", "npm init", "node run", "git init"],
    answer: "npm init",
  },
];


app.get("/api/questions", (req, res) => {
  res.json(questions);
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
