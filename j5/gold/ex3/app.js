const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static("public"));


let todos = [];
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.get("/api/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) {
    return res.status(404).json({ error: "Todo non trouvé" });
  }
  res.json(todo);
});


app.post("/api/todos", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Le titre est requis" });
  }

  const newTodo = {
    id: uuidv4(),
    title,
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});


app.put("/api/todos/:id", (req, res) => {
  const { title, completed } = req.body;
  const todo = todos.find(t => t.id === req.params.id);

  if (!todo) {
    return res.status(404).json({ error: "Todo non trouvé" });
  }

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});


app.delete("/api/todos/:id", (req, res) => {
  const index = todos.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Todo non trouvé" });
  }

  todos.splice(index, 1);
  res.json({ message: "Todo supprimé avec succès" });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
