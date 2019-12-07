const express = require('express')
const router = express.Router({ mergeParams: true })
const endpointService = require('./endpoint.service')

router.get('/list', endpointService.list)
router.get('/:endpoint_id', endpointService.view)
router.post('/add', endpointService.save)
router.put('/:endpoint_id/edit', endpointService.edit)

module.exports = router
