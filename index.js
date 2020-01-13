const pets = require('./models/pets');

// pets.all()
//     .then(allThePets => {
//         // do stuff
//         console.log()
//     })
    

async function main() {
    // const thePets = await pets.all();
    // console.log(thePets);

    // const aPet = await pets.one(1);
    // console.log(aPet)

    // const result = await pets.del(1);
    // console.log(result);

    // const updateResult = await pets.updateName(1, 'the amazing oakley');
    // console.log(updateResult);

    const updateResult = await pets.updateBirthdate(1, new Date());
    console.log(updateResult);
};

main();

