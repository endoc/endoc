const express = require('express')
const router = express.Router({ mergeParams: true })
const publishService = require('../../project.module/check-in.module/publish.module/publish.service')

router.get('/:api_doc_id/view', publishService.public.view)

module.exports = router
