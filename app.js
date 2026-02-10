const express = require('express');
const { message } = require('statuses');
const app = express();
const PORT = 3000;

app.use(express.json());

let libros = [
                {
                    id: 1,
                    titulo: 'El Silmarillion',
                    autor: 'J.R.R. Tolkien',
                    genero: 'Fantasía épica',
                    anioPublicacion: 1977
                },
                {
                    id: 2,
                    titulo: 'Cartas del Diablo a su Sobrino',
                    autor: 'C.S. Lewis',
                    genero: 'Ficción teológica',
                    anioPublicacion: 1942
                },
                {
                    id: 3,
                    titulo: '"Narraciones extraordinarias',
                    autor: 'Edgar Allan Poe',
                    genero: 'Terror gótico',
                    anioPublicacion: 1856
                },
                {
                    id: 4,
                    titulo: 'El SilmarLa Torre Oscura I: El pistolero',
                    autor: 'Stephen King',
                    genero: 'Fantasía oscura',
                    anioPublicacion: 1982
                },
                {
                    id: 5,
                    titulo: 'El Contacto',
                    autor: 'J.R.Carl Sagan. Tolkien',
                    genero: 'Ciencia ficción',
                    anioPublicacion: 1985
                }
            ]


app.get('/libros',(req,res)=>{
    res.status(200).json({status:200,message:'Success',data: libros});
})

// PUT - Actualizar un libro
app.put('/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, autor, genero, anioPublicacion } = req.body;

    const libro = libros.find(l => l.id === id);

    if (!libro) {
        return res.status(404).json({ message: 'Libro no encontrado' });
    }

    libro.titulo = titulo;
    libro.autor = autor;
    libro.genero = genero;
    libro.anioPublicacion = anioPublicacion;

    res.json({ message: 'Libro actualizado ', data: libro });
});

// DELETE - Eliminar un libro
app.delete('/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = libros.findIndex(l => l.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Libro no encontrado' });
    }

    libros.splice(index, 1);

    res.json({ message: 'Libro eliminado correctamente' });
});

app.listen(PORT, ()=>{
    console.log(`El servidor esta escuchando en http://localhost:${PORT}`);
});