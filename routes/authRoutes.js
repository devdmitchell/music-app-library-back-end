const express = require('express')
const { register, login } = require('../controllers/authController')
const router = express.Router()

router.post('/register', register)    //register new user
router.post('/login', login)          //log in existing user

module.exports = router