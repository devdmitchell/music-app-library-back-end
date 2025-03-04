const jwt = require('jsonwebtoken')

async function checkJwtToken(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader || authHeader.split(' ')[0] !== 'Bearer') {
        return res.status(403).json({ message: 'Token missing or invalid' })
    }
    try {
        const token = authHeader.split(' ')[1]
        res.locals.decodedJwt = jwt.verify(token, process.env.PRIVATE_JWT_KEY)
        next()
    } catch (error) {
        res.status(400).json({ message: 'Not Authorized', error: error.message })
    }
}

module.exports = checkJwtToken