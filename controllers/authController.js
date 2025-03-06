const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  try {
      const { username, password } = req.body
      if (!username || !password) {                       //makes sure input fields are valid
        return res.status(400).json({ message: 'Username and password are required' })
      }
    const hashedPassword = await bcrypt.hash(req.body.password, 6)          //hashes the password
    const user = new User({ username: req.body.username, password: hashedPassword })
    await user.save()
    res.json({ message: 'User registered successfully!' })
  } catch (error) {
    res.status(500).json({ message: 'Error registering user, please try again.', error: error.message })
  }
}

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, process.env.PRIVATE_JWT_KEY, { expiresIn: '1h' })
      res.json({ token })
    } else {
      res.status(400).json({ message: 'Invalid credentials' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message })
  }
}

module.exports = { register, login }