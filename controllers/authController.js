const User = require('../models/User')
const bcrypt = require('bcryptjs')     ///handles the hashing and verifying passwords
const jwt = require('jsonwebtoken')    //used to verify & create webtokens


// this is the function that handles user registration
const register = async (req, res) => {
  try {
    const { username, password } = req.body     //this is what extracts the username & password from the front end request, usually from a form submission
    if (!username || !password) {        //this checks to make sure that both fields are provided, if not it throws an error
      return res.status(400).json({ message: 'Username and password are required' })
    }
    const hashedPassword = await bcrypt.hash(password, 6)  //this hashes the password using bcrypt with a salt round of 6, which makes the password secure before it stores it in the database
    const user = new User({ username, password: hashedPassword })   //this creates a new user with my user model but it stores the hashed version of the password
    await user.save()  //this saves the user to MongoDB
    res.json({ message: 'User registered successfully!' })   //sends the success response
  } catch (error) {  //catches any error and sends response
    res.status(500).json({ message: 'Error registering user', error: error.message })
  }
}

//this function verifies a users credentials and returns a JWT token if valid
const login = async (req, res) => {
  try {
    const { username, password } = req.body  //pulls the login info from the request
    const user = await User.findOne({ username })     //looks the user up in the MongoDB database by username
    if (user && await bcrypt.compare(password, user.password)) {     //if the user exists and the password that was entered matches the hashed password in the database using .compare then..
      const token = jwt.sign({ userId: user._id }, process.env.PRIVATE_JWT_KEY, { expiresIn: '1h' })    //this generates a JWT that includes the user id inside the token payload, signed using my secret key (PRIVATE_JWT_KEY)  & it expires in 1 hour
      res.json({ token })     //this sends the token back to the frontend to store in localStorage & use for authenticated requests
    } else {     //if the user doesn't exist or the password is wrong, it throws an error
      res.status(400).json({ message: 'Invalid credentials' })
    }
  } catch (error) {    //catches any error and sends response
    res.status(500).json({ message: 'Error logging in', error: error.message })
  }
}

module.exports = { register, login }






//  `bcrypt.hash(...)` turns a plain-text password into a secure, unreadable string
// `bcrypt.compare(...)` checks if a login password matches the stored hash
// by hashing the password & having it go through 6 rounds it means if someone got into my database, they couldn't read the real passwords


//Register function validates input, hashes password, creates new user, saves it securely, and returns a response
