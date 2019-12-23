const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET
const jwtTimeout = process.env.JWT_TIMEOUT || 86400

module.exports = {
  generateJwt: async function (payload) {
    var token = await jwt.sign(payload, jwtSecret, {
      expiresIn: +jwtTimeout
    })
    return token
  }
}
