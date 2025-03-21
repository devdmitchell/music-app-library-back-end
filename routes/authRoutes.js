const express = require('express')
const { register, login } = require('../controllers/authController')
const rateLimit = require('express-rate-limit')
const router = express.Router()

const loginLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours, resets after every 24 hours
    max: 3, // Limits the user to 3 login attempts per IP address per day
    message: { message: 'Too many login attempts. Please try again in 24 hours.' },
    standardHeaders: true,
    legacyHeaders: false,
  })

router.post('/register', register)    //register new user
router.post('/login', loginLimiter, login)          //log in existing user

module.exports = router