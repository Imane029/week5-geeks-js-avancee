const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());


app.use(express.static('public'));


let posts = [
  { id: 1, title: "Premier post", content: "Hello World!" },
  { id: 2, title: "Deuxième post", content: "Express est cool !" }
];


app.get('/posts', (req, res) => res.json(posts));


app.post('/posts', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});


app.put('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: "Post not found" });
  post.title = req.body.title;
  post.content = req.body.content;
  res.json(post);
});


app.delete('/posts/:id', (req, res) => {
  posts = posts.filter(p => p.id !== parseInt(req.params.id));
  res.json({ message: "Post deleted" });
});


app.use((req, res) => res.status(404).json({ error: "Route not found" }));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
