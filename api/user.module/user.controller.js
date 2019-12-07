const express = require('express')
const router = express.Router()
const userService = require('./user.service')

router.post('/login', userService.login)
router.post('/register', userService.register)

module.exports = router
