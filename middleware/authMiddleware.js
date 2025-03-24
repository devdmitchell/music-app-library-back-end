const jwt = require('jsonwebtoken')     //loads jsonwebtoken library to handle JWT operations



//this is the middleware function that runs the protected routes
async function auth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1]    //reads the auth header which looks like : Bearer YOUR_TOKEN, then it safely splits it & grabs the token portion
    if (!token) return res.status(400).json({ message: 'No token provided' })   //if there is no token, the user is not logged in, so it sends back 400 not authorized

    const decoded = jwt.verify(token, process.env.PRIVATE_JWT_KEY)   //this decodes the jwt using your secret key. if it is invalid or expired, it will throw an error
    req.userId = decoded.userId    //attaches the authenticated user Id to the request so that the controllers know who made the request
    next()    //this passes control to the next middleware or route handler
  } catch (error) {    //catches any errors and returns a response
    res.status(400).json({ message: 'Invalid token', error: error.message })
  }
}

module.exports = auth



// This is important because it protects my routes. Only logged-in users with valid tokens can hit routes and get songs and fetch their specific data
// This function runs before protected routes to verify the user is logged in and authorized