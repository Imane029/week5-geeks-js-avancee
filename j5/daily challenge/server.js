const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const emojis = [
  { emoji: '😀', name: 'Smile' },
  { emoji: '🐶', name: 'Dog' },
  { emoji: '🌮', name: 'Taco' },
  { emoji: '🚗', name: 'Car' },
  { emoji: '🍎', name: 'Apple' },
  { emoji: '⚽', name: 'Soccer Ball' },
  { emoji: '🎸', name: 'Guitar' },
];

let leaderboard = [];
let playerScores = {}; 

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}


app.get('/game', (req, res) => {
  const { level } = req.query; 
  let optionsCount = 4;
  let timeLimit = 10;

  if (level === 'easy') {
    optionsCount = 2;
    timeLimit = 15;
  } else if (level === 'medium') {
    optionsCount = 3;
    timeLimit = 10;
  } else if (level === 'hard') {
    optionsCount = 4;
    timeLimit = 5;
  }

  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  const incorrect = shuffle(emojis.filter(e => e.name !== randomEmoji.name))
    .slice(0, optionsCount - 1);

  const options = shuffle([randomEmoji.name, ...incorrect.map(e => e.name)]);

  res.json({ 
    emoji: randomEmoji.emoji, 
    answer: randomEmoji.name, 
    options, 
    timeLimit 
  });
});


app.post('/guess', (req, res) => {
  const { guess, answer, player, level } = req.body;
  let correct = false;

  if (!playerScores[player]) playerScores[player] = 0;

  if (guess === answer) {
    playerScores[player]++;
    correct = true;
  }

  leaderboard = Object.entries(playerScores)
    .map(([p, s]) => ({ player: p, score: s }))
    .sort((a, b) => b.score - a.score);

  res.json({ correct, score: playerScores[player] });
});


app.get('/leaderboard', (req, res) => {
  res.json(leaderboard.slice(0, 5));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
