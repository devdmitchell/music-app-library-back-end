const express = require('express')
const logger = require('morgan') 
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const songRoutes = require('./routes/songRoutes')
const authRoutes = require('./routes/authRoutes')


const app = express()  

//middleware
app.use(logger('dev'))     //log http requests
app.use(express.json())    //json parse
app.use(cors())


//routes
app.use('/api/songs', songRoutes)
app.use('/api/auth', authRoutes)



// first thing that should run is express, mongoose, and port

module.exports = app