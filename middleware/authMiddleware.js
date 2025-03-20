const jwt = require('jsonwebtoken')

async function checkJwtToken(req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: "No token provided" })
    }
    const token = req.headers.authorization.substring(7)
    const decodedJwt = jwt.verify(token, process.env.PRIVATE_JWT_KEY)
    req.userId = decodedJwt.userId
    next()
  } catch (error) {
    res.status(400).json({ message: "Not Authorized", error: error.message })
  }
}

module.exports = checkJwtToken