const express = require('express');
const app = express();
const port = 4321;

app.use(express.json());

let items = [];

// Create
app.post('/items', (req, res) => {
    const item = req.body;
    items.push(item);
    res.status(201).send(item);
});

// Read
app.get('/items', (req, res) => {
    res.send(items);
});

app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(i => i.id === id);
    if (item) {
        res.send(item);
    } else {
        res.status(404).send({ message: 'Item not found' });
    }
});

// Update
app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
        items[index] = req.body;
        res.send(items[index]);
    } else {
        res.status(404).send({ message: 'Item not found' });
    }
});

// Delete
app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
        const deletedItem = items.splice(index, 1);
        res.send(deletedItem);
    } else {
        res.status(404).send({ message: 'Item not found' });
    }
});

app.listen(port);
