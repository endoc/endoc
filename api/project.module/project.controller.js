const express = require('express')
const router = express.Router()
const projectService = require('./project.service')
const memberController = require('./member.module/member.controller')
const endpointController = require('./endpoint.module/endpoint.controller')
const checkInController = require('./check-in.module/check-in.controller')
const logController = require('./logs.module/logs.controller')

router.get('/list', projectService.list)
router.get('/:project_id', projectService.view)
router.post('/add', projectService.save)
router.get('/:project_id/postman', projectService.getPostmanMaterial)

// Child modules
router.use('/:project_id/member', memberController)
router.use('/:project_id/endpoint', endpointController)
router.use('/:project_id/check-in', checkInController)
router.use('/:project_id/log', logController)

module.exports = router
