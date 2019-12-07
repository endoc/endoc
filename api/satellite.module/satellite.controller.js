const express = require('express')
const router = express.Router()
const satelliteService = require('./satellite.service')

router.get('/:satellite_id', satelliteService.view)

module.exports = router
