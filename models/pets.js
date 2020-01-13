const db = require('./connection');

// Create
function create() {

};

// Retrieve

// Async version:
async function one(id) {
    try {
        // use .one() if there should exactly be one result.
        // const onePet = await db.one(`select * from pets where id=${id}`);
        
        // $1 is syntax specific to pg-promise
        // it means interpolate the 1st value from the array
        // (in this case, that's the `id` that we received as an argument)
        const onePet = await db.one(`select * from pets where id=$1`, [id]);
        return onePet;
    } catch(err) {
        return null;
    }
};

// Promise version
// function one(id) {
//     return db.one(`select * from pets where id=${id}`);
//         .catch(err => {
//             console.log(err);
//             return null;
//         });




async function all() {
    const allPets = await db.query(`select * from pets;`)
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(err => {
            console.log(err);
            return [];
        });
    console.log(allPets); 
    return allPets;
};

// Update
function update() {

};

// Delete
function del() {

};

module.exports = {
    create,
    one,
    all,
    update,
    del
};