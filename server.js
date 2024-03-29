/////////////////////////////////
// import dependencies
/////////////////////////////////
// this allows us to load our env variables
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const playerRoutes = require('./controller/player_routes')
const userRoutes = require('./controller/user_routes')
const teamRoutes = require('./controller/team_routes')

////////////////////////////////////////////
// Create our express application object
////////////////////////////////////////////
const app = require('liquid-express-views')(express())

////////////////////////////////////////////
// Middleware
////////////////////////////////////////////
// this is for request logging
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
// parses urlencoded request bodies
app.use(express.urlencoded({ extended: false }))
// to serve files from public statically
app.use(express.static('public'))
// bring in our session middleware
const session = require('express-session')
const MongoStore = require('connect-mongo')

// here's the middleware that sets up our sessions
app.use(
	session({
		secret: process.env.SECRET,
		store: MongoStore.create({
			mongoUrl: process.env.MONGODB_URI,
			// secret: 'epicSecretDrewThompson',
			// touchAfter: 24 * 60 * 60
		}),
		saveUninitialized: true,
		resave: false
	})
)

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.use('/nba/', playerRoutes)
// app.use('/nba/teams', teamRoutes)
app.use('/users', userRoutes)
app.use('/', teamRoutes)
// localhost:3000/
app.get('/', (req, res) => {
	// res.send('your server is running, better go catch it')
	res.redirect('/nba')
})

////////////////////////////////////////////
// Server Listener
////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(process.env.PORT || 3000, () => {
	console.log(`app is listening on port: ${PORT}`)
})
