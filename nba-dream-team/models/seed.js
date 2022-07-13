///////////////////////////////////////
// This file runs on `npm run seed`
///////////////////////////////////////

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

Player.remove({})
        .then(deletedFruits => {
            console.log(deletedFruits)
    for (let j = 1; j <= 38; j++) {
        let resultData;
        let saveCounter = 0;


    setTimeout(() => db.on('open', () => {
        // .then(() => console.log("mongodb connection success"))
        // .catch(error => console.log(error));
    
                const url = [`https://www.balldontlie.io/api/v1/players?page=${j}&per_page=100`]
                url.map(async url => {
                try{
                const response = await fetch(url);
                const json = await response.json();
                resultData = json.data;
                for (let i = 0; i < resultData.length; i++) {
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
                        db.close()
                        .then(() => console.log("saved succesfully and mongodb   disconnected"))
                        .catch(error => console.log(error));
                        }
                    });
                }
                } catch (error) {
                console.log(error);
                db.close()
                }
                })
            
    
    }), 2000)
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