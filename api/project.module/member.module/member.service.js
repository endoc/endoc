const User = require('./../../user.module/user.model')
const Project = require('./../project.model')
const ReturnObj = require('./../../../models/return-object.model')

module.exports = {
  list: async function (req, res) {
    try {
      const _projectId = req.params.project_id
      const _data = await Project.findById(_projectId).populate('Members', 'Name Surname Username').select('Members -_id').exec()
      res.status(200).send(new ReturnObj(true, 'MSG_SUCCESS', 200, _data && _data.Members ? _data.Members : []))
    } catch (error) {
      res.status(500).send(new ReturnObj(false, 'ERR_SOMETHING_WENT_WRONG', 500, null))
    }
  },

  save: async function (req, res) {
    try {
      const _projectId = req.params.project_id
      const _memberId = req.body.username
      const _user = await User.findOne({ Username: _memberId }).select('_id').exec()
      if (!_user) {
        res.send(new ReturnObj(false, 'ERR_USER_DOESNT_EXIST', 200, null))
      } else {
        const qry = { $addToSet: { 'Members': _user._id } }
        const _data = await Project.findByIdAndUpdate({ _id: _projectId }, qry, { new: true })
          .populate('Members', 'Name Surname Username')
          .exec()
        res.send(new ReturnObj(true, 'MSG_USER_ADDED_ON_BOARD', 200, _data.Members))
      }
    } catch (error) {
      res.status(500).send(new ReturnObj(false, 'ERR_MEMBER_NOT_ADDED', 500, null))
    }
  },

  remove: async function (req, res) {
    try {
      const _projectId = req.params.project_id
      const _memberId = req.params.member_id
      const qry = { $pull: { 'Members': _memberId } }
      const _data = await Project.findByIdAndUpdate({ _id: _projectId }, qry, { new: true })
        .populate('Members', 'Name Surname Username')
        .exec()
      res.send(new ReturnObj(true, 'MSG_USER_REMOVED_FROM_BOARD', 200, _data.Members))
    } catch (error) {
      res.status(500).send(new ReturnObj(false, 'ERR_MEMBER_NOT_REMOVED', 500, null))
    }
  }
}
