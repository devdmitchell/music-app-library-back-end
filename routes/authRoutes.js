const express = require('express')
const { register, login } = require('../controllers/authController')
const rateLimit = require('express-rate-limit')
const auth = require('../middleware/authMiddleware') // brings in custom middleware to protect routes
const User = require('../models/User')
const router = express.Router()


// login rate limiter (prevents brute force attacks by limiting login attempts)
const loginLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours, resets after every 24 hours
  max: 1000, // Limits the user to 100 login attempts per IP address per day
  message: { message: 'Too many login attempts. Please try again in 24 hours.' },
  standardHeaders: true,
  legacyHeaders: false,
})

router.post('/register', register) // register new user
router.post('/login', loginLimiter, login) // log in existing user

// authenticated route to return the current user (used by frontend after login to keep user state)
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password') // omit password
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({ user })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})
module.exports = router