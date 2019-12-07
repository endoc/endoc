const express = require('express')
const router = express.Router({ mergeParams: true })
const publishService = require('./publish.service')

router.post('/add', publishService.add)
router.get('/view', publishService.view)
router.delete('/:publish_id/delete', publishService.delete)

module.exports = router
