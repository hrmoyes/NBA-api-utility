// using an already connected mongoose not a fresh one from node_modules
const mongoose = require('./connection')
const commentSchema = require('./comment')
// inside of mongoose I want the keys that are named Schema and model
const { Schema, model } = mongoose

const playerSchema = new Schema({
    firstName: String,
    lastName: String,
    height: Number,
    weight: Number,
    position: String,
    bdlId: Number,
    owner: {
        type: Schema.Types.ObjectId, // a single User ._id
        ref: 'User', // whatever string you place in model creation
    },
}, {
    timestamps: true
})

// need to make a model
// this collections will be called players
const Player = model('Player', playerSchema)

module.exports = Player