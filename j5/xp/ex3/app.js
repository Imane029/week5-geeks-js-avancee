const express = require('express');
const app = express();
const PORT = 5000;

const { fetchPosts } = require('./data/dataService');

app.use(express.json());


app.use(express.static('public'));


app.get('/posts', async (req, res) => {
  try {
    const posts = await fetchPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});


let localPosts = [];

app.get('/local-posts', (req, res) => res.json(localPosts));

app.post('/local-posts', (req, res) => {
  const newPost = {
    id: localPosts.length + 1,
    title: req.body.title,
    body: req.body.body
  };
  localPosts.push(newPost);
  res.status(201).json(newPost);
});

app.put('/local-posts/:id', (req, res) => {
  const post = localPosts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: "Post not found" });

  post.title = req.body.title;
  post.body = req.body.body;
  res.json(post);
});

app.delete('/local-posts/:id', (req, res) => {
  localPosts = localPosts.filter(p => p.id !== parseInt(req.params.id));
  res.json({ message: "Post deleted" });
});


app.use((req, res) => res.status(404).json({ error: "Route not found" }));

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
