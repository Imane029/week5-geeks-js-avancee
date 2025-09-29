const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static('public')); // pour servir le frontend

let books = [
  { id: 1, title: "1984", author: "George Orwell", publishedYear: 1949 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", publishedYear: 1960 }
];

// GET all books
app.get('/api/books', (req, res) => res.json(books));

// GET one book
app.get('/api/books/:bookId', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.bookId));
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// CREATE book
app.post('/api/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    publishedYear: req.body.publishedYear
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// UPDATE book
app.put('/api/books/:bookId', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.bookId));
  if (!book) return res.status(404).json({ error: "Book not found" });
  book.title = req.body.title;
  book.author = req.body.author;
  book.publishedYear = req.body.publishedYear;
  res.json(book);
});

// DELETE book
app.delete('/api/books/:bookId', (req, res) => {
  books = books.filter(b => b.id !== parseInt(req.params.bookId));
  res.json({ message: "Book deleted" });
});

// 404
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

app.listen(PORT, () => console.log(`Book API running at http://localhost:${PORT}`));
