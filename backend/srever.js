const express = require("express")
const path = require("path")
const Database = require("./utilities/DatabaseManager")
// Setting up express, serving client files, configuring bodyParser
//TODO: need to add it to the .env file
const port = 8000
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '.', 'dist')))
app.use(express.static(path.join(__dirname, '.', 'node_modules')))


// Internal Modules Imports
const api = require('./routes/transactionsApi')

// Connecting to "api", i.e our routes

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})
app.use('/transactions', api)
// Running the server
app.listen(port, function(){
    console.log(`Node server created at port ${port}`)
})
// Connecting to DB
Database.connectDB()