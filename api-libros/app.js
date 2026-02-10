
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let libros = [
    { id: 1, titulo: 'El Silmarillion', autor: 'J.R.R. Tolkien', genero: 'Fantasía épica', anioPublicacion: 1977 },
    { id: 2, titulo: 'Cartas del Diablo a su Sobrino', autor: 'C.S. Lewis', genero: 'Ficción teológica', anioPublicacion: 1942 },
    { id: 3, titulo: 'Narraciones extraordinarias', autor: 'Edgar Allan Poe', genero: 'Terror gótico', anioPublicacion: 1856 }
];

// GET todos los libros
app.get('/libros', (req, res) => {
    res.status(200).json({ status: 200, message: 'Success', data: libros });
});

// GET libro por ID
app.get('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const libro = libros.find(l => l.id === id);

    if (!libro) {
        return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.json({ status: 200, data: libro });
});

// POST agregar libro
app.post('/api/books', (req, res) => {
    const { titulo, autor, genero, anioPublicacion } = req.body;

    if (!titulo || !autor || !genero || !anioPublicacion) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const nuevoLibro = {
        id: libros.length + 1,
        titulo,
        autor,
        genero,
        anioPublicacion
    };

    libros.push(nuevoLibro);

    res.status(201).json({ message: 'Libro agregado', data: nuevoLibro });
});

// PUT actualizar libro
app.put('/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const libro = libros.find(l => l.id === id);

    if (!libro) {
        return res.status(404).json({ message: 'Libro no encontrado' });
    }

    Object.assign(libro, req.body);
    res.json({ message: 'Libro actualizado', data: libro });
});

// DELETE eliminar libro
app.delete('/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = libros.findIndex(l => l.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Libro no encontrado' });
    }

    libros.splice(index, 1);
    res.json({ message: 'Libro eliminado' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
