// using an already connected mongoose not a fresh one from node_modules
const mongoose = require('./connection')
const playerSchema = require('./player')

// inside of mongoose I want the keys that are named Schema and model
const { Schema, model } = mongoose

const teamSchema = new Schema(
	{
		name: String,
		mascot: String,
		owner: {
			type: Schema.Types.ObjectId, // a single User ._id
			ref: 'User', // const User = model('User', userSchema) the string of 'User' is how we reference a model
		},
		players: {
            type: [mongoose.Schema.Types.ObjectId], // a fruit can have many comments. Comments are a sub doc of Fruit
            ref: 'Player'
        },
	},
	{
		timestamps: true,
	}
)

// need to make a model
// this collections will be called fruits
const Team = model('Team', teamSchema)

module.exports = Team