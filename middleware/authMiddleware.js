const jwt = require('jsonwebtoken')     //loads jsonwebtoken library to handle JWT operations



//this is the middleware function that runs the protected routes
async function auth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1]    //reads the auth header which looks like : Bearer YOUR_TOKEN, then it safely splits it & grabs the token portion
    if (!token) return res.status(401).json({ message: 'No token provided' })

    const decoded = jwt.verify(token, process.env.PRIVATE_JWT_KEY)
    req.userId = decoded.userId
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message })
  }
}

module.exports = auth