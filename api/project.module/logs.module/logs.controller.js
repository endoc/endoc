const express = require('express')
const router = express.Router({ mergeParams: true })
const logService = require('./logs.service')

router.get('/list', logService.list)
router.get('/:log_id', logService.view)

module.exports = router
