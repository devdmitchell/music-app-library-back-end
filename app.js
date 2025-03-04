const express = require('express')
const logger = require('morgan') 
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()
const songRoutes = require('./routes/songRoutes')
const authRoutes = require('./routes/authRoutes')


const app = express()  

//middleware
app.use(logger('dev'))
app.use(express.json())  
app.use(cors())

app.use('/api/songs', songRoutes)
app.use('/api/auth', authRoutes)



// first thing that should run is express, mongoose, and port

module.exports = app