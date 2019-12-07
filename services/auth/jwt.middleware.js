const jwt = require('jsonwebtoken')
const apiRoutes = require('express').Router()
const config = require('./../../env/config.json')
const ReturnObj = require('../../models/return-object.model')
const jwtSecret = process.env.JWT_SECRET || config.JWT_SECRET

apiRoutes.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['Authorization'] || req.headers['x-access-token'] || req.headers['authorization']
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, jwtSecret, function (err, decoded) {
      if (err) {
        return res.status(401).send(new ReturnObj(false, 'ERR_NOT_AUTHORIZED', 401, err))
      } else {
        // if everything is good, save to request for use in other routes
        // req.decoded = decoded // full decoded jwt object
        req.caller_id = decoded._id // only caller id
        next()
      }
    })
  } else {
    // if there is no token
    // return an error
    return res.status(401).send(new ReturnObj(false, 'ERR_NOT_AUTHORIZED', 401, null))
  }
})

module.exports = apiRoutes
