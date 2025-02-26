const express = require('express')
const logger = require('morgan') 
const mongoose = require('mongoose')
const cors = require ('cors')


const app = express()  

//middleware
app.use(logger('dev'))
app.use(express.json())  
app.use(cors())



// first thing that should run is express, mongoose, and port

module.exports = app