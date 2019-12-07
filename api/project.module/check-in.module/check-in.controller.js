const express = require('express')
const router = express.Router({ mergeParams: true })
const checkInService = require('./check-in.service')
const exportControler = require('./export.module/export.controller')
const publishController = require('./publish.module/publish.controller')

router.get('/list', checkInService.list)
router.post('/add', checkInService.save)

// Child modules
router.use('/:check_in_id/export', exportControler)
router.use('/:check_in_id/publish', publishController)
module.exports = router
