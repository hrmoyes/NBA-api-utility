// requiring dotenv package so we can geet things out of our .env file
require('dotenv').config()
// getting mongoose to use
const mongoose = require('mongoose')


const DATABASE_URI = process.env.MONGODB_URI
const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// connecting our mongoDB to mongoose
mongoose.connect(DATABASE_URI, config)

mongoose.connection
// handle the opening of the connections
// running code block on open
// console.logging a string
    .on('open', () => console.log(`Mongoose connected to ${mongoose.connection.host}:${mongoose.connection.port}`))
    // since we have opened a connection we've got to close it
    // running a code block on close
    // close 
    .on('close', () => console.log('Disconnected from Mongoose'))
    // handle any error that might happen
    // running a code block on error
    // using console.error to see that error
    .on('error', err => console.error(err))

module.exports = mongoose