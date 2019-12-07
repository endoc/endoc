const router = require('express').Router()

// Middlewares
const jwtMiddleware = require('./services/auth/jwt.middleware')

// Routes
const _public = require('./api/public.module/public.controller')
const auth = require('./api/user.module/user.controller')
const project = require('./api/project.module/project.controller')
const satellite = require('./api/satellite.module/satellite.controller')

// Allow anonymous
router.use('/public', _public)
router.use('/auth', auth)

// Protected routes
router.use(jwtMiddleware)
router.use('/project', project)
router.use('/satellite', satellite)

module.exports = router
