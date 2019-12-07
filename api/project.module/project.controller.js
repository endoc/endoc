const express = require('express')
const router = express.Router()
const projectService = require('./project.service')
const memberController = require('./member.module/member.controller')
const endpointController = require('./endpoint.module/endpoint.controller')
const checkInController = require('./check-in.module/check-in.controller')

router.get('/list', projectService.list)
router.get('/:project_id', projectService.view)
router.post('/add', projectService.save)

// Child modules
router.use('/:project_id/member', memberController)
router.use('/:project_id/endpoint', endpointController)
router.use('/:project_id/check-in', checkInController)


module.exports = router
