const express = require('express')
const router = express.Router()
const logService = require('./../../project.module/logs.module/logs.service')

router.post('/add', logService.save)

module.exports = router
