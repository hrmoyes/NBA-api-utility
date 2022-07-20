const express = require('express')
// making a router
const router = express.Router()
// importing Fruit model to access database
const Player = require('../models/player')

// DELETE - Delete
// router.delete('/:id', (req, res) => {
//     const fruitId = req.params.id

//     Fruit.findByIdAndRemove(fruitId)
//         .then(fruit => {
//             res.redirect('/fruits')
//         })
//         .catch(err => {
//             res.json(err)
//         })
// })

// GET route for displaying an update form
// router.get('/:id/edit', (req, res) => {
//     const fruitId = req.params.id

//     Fruit.findById(fruitId)
//         .then(fruit => {
//             res.render('fruits/edit', { fruit })
//         })
//         .catch(err => {
//             res.json(err)
//         })
// })

// PUT - Update
// localhost:3000/fruits/:id
// router.put('/:id', (req, res) => {
//     const fruitId = req.params.id

//     req.body.readyToEat = req.body.readyToEat === 'on' ? true : false

//     Fruit.findByIdAndUpdate(fruitId, req.body, { new: true })
//         .then(fruit => {
//             res.redirect(`/fruits/${fruit._id}`)
//         })
//         .catch(err => {
//             res.json(err)
//         })
// })

// GET route for displaying my form for create
// router.get('/new', (req, res) => {
//     const username = req.session.username
//     const loggedIn = req.session.loggedIn
//     res.render('fruits/new', { username, loggedIn })
// })

// POST - Create
// router.post('/', (req, res) => {
//     req.body.readyToEat = req.body.readyToEat === 'on' ? true : false

//     // now that we have user specific fruits, we'll add a username upon creation
//     // remember, when we login, we saved the username to the session object
//     // using the ._id to set the owner field
    
//     req.body.owner = req.session.userId

//     console.log(req.body)
//     Fruit.create(req.body)
//         .then(fruit => {
//             console.log(fruit)
//             // res.json(fruit)
//             res.redirect('/fruits')
//         })
//         .catch(err => {
//             res.json(err)
//         })
// })

// GET - Index
// localhost:3000/nba
router.get('/', (req, res) => {
    // mongoose to find all fruits
    Player.find({})
    // return fruits as json
        .then(players => {
            // res.json(fruit)
            res.render('home', { players })
        })
        .catch(err => {
            res.json(err)
        })
})

// GET - Index
// localhost:3000/nba/players
router.get('/players', (req, res) => {
    // mongoose to find all players
    Player.find({})
    // return fruits as json
        .then(players => {
            // res.json(fruit)
            res.render('players/index', { players })
        })
        .catch(err => {
            res.json(err)
        })
})



//GET - Show
// localhost:3000/nba/players/:id
router.get('/players/:id', (req, res) => {
    const playerId = req.params.id

    Player.findById(playerId)
        .then(player => {
            res.render('players/show', { player })
        })
})

router.get('/players/search/:playername', (req, res) => {
    console.log(document.getElementById('playerName'))
    console.log(req.params.playername)
    const {playername} = req.params
    Player.find({firstName: playername})
        .then(player => {
            res.render('players/search', {player})
        })
})
// router.get('/mine', (req, res) => {
//     // find the fruits associated with the logged in user
//     Fruit.find({ owner: req.session.userId })
//         .then(fruits => {
//             res.render('fruits/index', { fruits })
//         })
//         .catch(error => {
//             console.log(error)
//             res.json({ error })
//         })
// })

// seed route --> has been moved to models/seed.js
// insert many items into our database with just going to this route
// localhost:3000/fruits/seed
// router.get('/seed', (req, res) => {
//     // starting data
//     const startFruits = [
//     { name: "Orange", color: "orange", readyToEat: false },
//     { name: "Grape", color: "purple", readyToEat: false },
//     { name: "Banana", color: "orange", readyToEat: false },
//     { name: "Strawberry", color: "red", readyToEat: false },
//     { name: "Coconut", color: "brown", readyToEat: false },
//   ]
//   // delete if we have fruits
//   Fruit.deleteMany({})
// 		// insert data
// 		.then(() => {
//             Fruit.create(startFruits)
//             // return this data as json to view
//             .then(data => {
//                 res.json(data)
//             })
//             // .catch(err => console.error(err))
// 		    .catch(console.error)
//         })
// })

// GET - Show
// localhost:3000/fruits/:id <- change with the id being passed in
// router.get('/:id', (req, res) => {
//     const playerId = req.params.id

//     Player.findById(playerId)
//     // populate our User models fields
//     // comment has an author field and that is the ref to the User model
//     // always going to be a string of the value you want to populate
//     // this also has to be anohter model 
//         .populate('comments.author')
//         // send back some json
//         .then(player => {
//             // res.json(fruit)
//             const userId = req.session.userId
//             const username = req.session.username
//             res.render('players/show', { player, userId, username })
//         })
//         .catch(err => {
//             res.json(err)
//         })
// })

module.exports = router