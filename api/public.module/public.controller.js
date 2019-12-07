const express = require('express')
const router = express.Router()
const apiDocController = require('./api-doc.module/api-doc.controller')

router.use('/api-doc', apiDocController)

module.exports = router
