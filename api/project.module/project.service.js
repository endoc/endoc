const Project = require('./project.model')
const ReturnObj = require('./../../models/return-object.model')

module.exports = {
  list: async function (req, res) {
    try {
      const _userId = req.caller_id
      const _data = await Project.find({ $or: [{ 'CreatedBy': _userId }, { 'Members': _userId }] }).select('Title Description').exec()
      res.status(200).send(new ReturnObj(true, 'MSG_SUCCESS', 200, _data))
    } catch (error) {
      res.status(500).send(new ReturnObj(false, 'ERR_SOMETHING_WENT_WRONG', 500, null))
    }
  },

  view: async function (req, res) {
    try {
      const _projectId = req.params.project_id
      const _data = await Project.findById(_projectId).populate('Members', 'Name Surname Username').exec()
      res.send(new ReturnObj(false, 'MSG_PROJECT_FOUND', 200, _data))
    } catch (error) {
      res.status(500).send(new ReturnObj(false, 'ERR_SOMETHING_WENT_WRONG', 500, null))
    }
  },

  save: async function (req, res) {
    try {
      const _project = new Project(req.body)
      const _userId = req.caller_id
      _project.CreatedBy = _userId
      _project.Members = [_userId]

      const _data = await _project.save()
      res.status(200).send(new ReturnObj(true, 'MSG_PROJECT_CREATED', 200, _data))
    } catch (error) {
      res.status(500).send(new ReturnObj(false, 'ERR_PROJECT_NOT_CREATED', 500, null))
    }
  }
}
