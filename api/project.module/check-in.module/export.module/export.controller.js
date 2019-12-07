const express = require('express')
const router = express.Router({ mergeParams: true })
const exportService = require('./export.service')

router.post('/html', exportService.html)
router.post('/pdf', exportService.pdf)

module.exports = router
