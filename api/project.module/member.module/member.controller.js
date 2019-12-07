const express = require('express')
const router = express.Router({ mergeParams: true })
const memberService = require('./member.service')

router.get('/list', memberService.list)
// router.get('/:projectId', memberService.view)
router.post('/add', memberService.save)
router.delete('/:member_id/remove', memberService.remove)

module.exports = router
