const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.headers['authorization']
    if (token) {
      jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' })
        req.userId = decoded.userId
        next()
      })
    } else {
      res.status(403).json({ message: 'No token provided' })
    }
  }