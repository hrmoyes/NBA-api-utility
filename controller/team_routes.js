const express = require('express')
// making a router
const router = express.Router()
// importing Fruit model to access database
const Team = require('../models/team')

router.get('/myTeams', (req, res) => {
    console.log('hit')
    Team.find({})
        .then(teams => {
            res.render('teams/index', {teams})
        })
        .catch(err => {
            res.json(err)
        })
})


    router.delete('/:id', (req, res) => {
        const teamId = req.params.id
    
        Team.findByIdAndRemove(teamId)
            .then(team => {
                res.redirect('/nba/myTeams')
            })
            .catch(err => {
                res.json(err)
            })
    })

router.get('/myTeams/:id', (req, res) => {
    const teamId = req.params.id

    Team.findById(teamId)
        .then(team => {
            res.render('teams/show', { team })
        })
})
// GET route for displaying my form for create
router.get('/new', (req, res) => {
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    res.render('teams/new', { username, loggedIn })
})
router.post('/', (req, res) => {

    // now that we have user specific fruits, we'll add a username upon creation
    // remember, when we login, we saved the username to the session object
    // using the ._id to set the owner field
    
    req.body.owner = req.session.userId

    console.log(req.body)
    Team.create(req.body)
        .then(team => {
            console.log(team)
            // res.json(fruit)
            res.redirect('/nba/myTeams')
        })
        .catch(err => {
            res.json(err)
        })
})
module.exports = router