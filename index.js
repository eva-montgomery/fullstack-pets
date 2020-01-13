const http = require('http');
const express = require('express');

const app = express();
const PORT = 3000;

const server = http.createServer(app);

const pets = require('./models/pets');


// see all pets
app.get('/pets', async (req, res) => {
    const thePets = await pets.all();
    // res.send('you want /pets');
    res.json(thePets);
});

app.get('/pets/:id', async (req, res) => {
    //console.log(req.params);
    const petByID = await pets.one(req.params.id);
    console.log(petByID);
    res.json(petByID);
});

// Create
app.get('/pets/create/:name/:species/:birthdate/:owner_id', async (req, res) => {
    console.log(req.params);
    const createPet = await pets.create(req.params.name, req.params.species, req.params.birthdate, req.params.owner_id);
    if (createPet === 1) {
        res.send('You added a new pet');
    } else {
        res.send('no pet created')
    }
});

app.post('/pets/create')

// Update
app.get('/pets/edit/:id/:name', async (req, res) => {
    console.log(req.params);
    const updateResult = await pets.updateName(req.params);
    res.json(updateResult);
});
app.post('/pets/edit')

//Delete
app.get('/pets/:id/delete', async (req, res) => {
    const deletePetbyID = await pets.del((req.params.id));
    res.json(deletePetbyID);
});


app.post('/pets/:id/delete')

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
