const http = require('http');
const express = require('express');

const app = express();
const PORT = 3000;

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});

// Use this if you're building an API
// that accepts JSON data from the client.
// const parseJson = bodyParser.json();

// This is what you'll see in tutorials.
// I think it's not so great.
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

const server = http.createServer(app);

const pets = require('./models/pets');


// See all pets!
app.get('/pets', async (req, res) => {
    const thePets = await pets.all();
    // res.send('you want /pets');
    res.json(thePets);

    // Here's what `res.json()` is doing:
    // res.writeHead(200, {
    //     'Content-Type': 'application/json'
    // })
    // const jsonString = JSON.stringify(thePets);
    // res.write(jsonString);
    // res.end();
});

app.get('/pets/:id(\\d+)', async (req, res) => {
    console.log('you want to get by id');
    // show me a single pet by their id
    const { id } = req.params;
    const thePet = await pets.one(id);
    res.json(thePet);
});

// Hint: npm i body-parser

// Create
app.get('/pets/create', (req, res) => {
    console.log('you want the form');
    // console.log('yes you are at /pets/create');
    // res.send('yes you are at /pets/create');

    // express will look in templates/pets/form.html
    res.render('pets/form');
});
app.post('/pets/create', parseForm, async (req, res) => {
    console.log(req.body.name);
    console.log(req.body.species);
    console.log(req.body.birthdate);

    const { name, species, birthdate } = req.body;
    // I could create a new pet!
    // and I'm going to hard code the owner id!

    const owner_id_CHANGEME = 1;
    const newPetId = await pets.create(name, species, birthdate, owner_id_CHANGEME);
    console.log(`The new pet id is ${newPetId}`);

    res.redirect(`/pets/${newPetId}`);
});

// Update
app.get('/pets/:id/edit')
app.post('/pets/:id/edit')

// Delete
app.get('/pets/:id/delete')
app.post('/pets/:id/delete')

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});