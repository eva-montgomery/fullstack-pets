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
async function updateName(id, name) {
    const result = await db.result(`
        update pets set
            name=$1
        where id=$2; 
    `, [name, id]);
    if (result.rowCount === 1) {
        return id;
    } else {
        return null;
    }
};

async function updateBirthdate(id, dataObject) {
    // Postgres wants this: '2020-01-13'

    const year = dataObject.getFullYear(); // YYYY
    let month = dataObject.getMonth() + 1; // MM
    if (month < 10) {
        month = `0${month}`;
    }
    let day = dataObject.getDate(); // DD
    if (day < 10) {
        day = `0${day}`;
    }
    const dateString = `${year}-${month}-${day}`;
    const result = await db.result(`
        update pets set
            birthdate=$1
        where id=$2
    `, [dateString, id]);
    return result;
};

// Delete
async function del(id) {
    const result = await db.result(`delete from pets where id=$1`, [id]);
    console.log(result);
    if (result.rowCount === 1) {
        return id;
    } else {
        return null;
    }
};

module.exports = {
    create,
    one,
    all,
    updateName,
    updateBirthdate,
    del
};