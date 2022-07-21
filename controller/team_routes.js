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

module.exports = router