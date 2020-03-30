const express = require('express')
const router = express.Router()
const apiDocController = require('./api-doc.module/api-doc.controller')
const logController = require('./logs.module/logs.controller')

router.use('/api-doc', apiDocController)
router.use('/log', logController)

module.exports = router
