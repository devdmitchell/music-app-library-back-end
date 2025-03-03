const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const axios = require('axios');



const app = express()  

//middleware
app.use(logger('dev'))
app.use(express.json())  
app.use(cors())



// first thing that should run is express, mongoose, and port

module.exports = app