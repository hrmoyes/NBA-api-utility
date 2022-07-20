///////////////////////////////////////
// This file runs on `npm run seed`
///////////////////////////////////////
require('events').EventEmitter.prototype._maxListeners = 101;
///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Player = require('./player')
const fetch = require('node-fetch')
///////////////////////////////////////
// Seed Code
///////////////////////////////////////
// save my db connection to a variable for easy reference later
const db = mongoose.connection
    

db.on('open', () => {
    for (let j = 1; j <= 38; j++) {
        let resultData;
        let saveCounter = 0;
        console.log('for loop opened') 

// .then(() => console.log("mongodb connection success"))
    // .catch(error => console.log(error));
        console.log('opened')

            const url = [`https://www.balldontlie.io/api/v1/players?page=${j}&per_page=100`]
            url.map(async url => {
            try{
            const response = await fetch(url);
            console.log(response)
            const json = await response.json();
            console.log(json)
            resultData = json.data;
            console.log(resultData)
            for (let i = 0; i < 100; i++) {
                console.log(`getting player ${i}`)
                let newPlayer = new Player({
                    firstName: resultData[i].first_name,
                    lastName: resultData[i].last_name,
                    height: resultData[i].height_feet*12 + resultData[i].height_inches,
                    weight: resultData[i].weight_pounds,
                    position: resultData[i].position,
                    bdlId: resultData[i].id,
                })
            newPlayer.save(() => {
                console.log("saved" + newPlayer)
                
                saveCounter++;
            
                if (saveCounter === resultData.length) {
                    // db.close()
                    // .then(() => 
                    console.log("saved succesfully and mongodb   disconnected")
                    // )
                    // .catch(error => console.log(error));
                }
            });
        }
    } catch (error) {
        console.log(error);
        // db.close()
    }
})
}
        
})










































// this runs the callback function when the db connection is opened from this file
// db.on('open', () => {
//     // array of starter fruits
//     const startFruits = [
//         { name: "Orange", color: "orange", readyToEat: false },
//         { name: "Grape", color: "purple", readyToEat: false },
//         { name: "Banana", color: "orange", readyToEat: false },
//         { name: "Strawberry", color: "red", readyToEat: true },
//         { name: "Coconut", color: "brown", readyToEat: true }
//     ]

//     // when we seed data, we usually clear out the db first
//     Fruit.remove({})
//     // then we create that data
//         .then(deletedFruits => {
//             console.log('this is what remove returns', deletedFruits)

//             // now that our delete was successful, we can create our fruits
//             Fruit.create(startFruits)
//                 .then(data => {
//                     console.log('the new fruits', data)
//                     db.close()
//                 })
//                 .catch(error => {
//                     console.log('error:', error)
//                     db.close()
//                 })
//         })
//         .catch(error => {
//             console.log('error:', error)
//             db.close()
//         })
//     // whether it's successful or not, we want to close our db connection
// })