const express = require('express');
const app = express();

// Middleware para leer JSON
app.use(express.json());

// Lista de libros (datos en memoria)
let books = [
  { id: 1, title: "El Quijote", author: "Miguel de Cervantes" },
  { id: 2, title: "Cien años de soledad", author: "Gabriel García Márquez" }
];

// GET /api/books/:id
app.get('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({ message: 'Libro no encontrado' });
  }

  res.json(book);
});

// POST /api/books
app.post('/api/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title y author son obligatorios' });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
