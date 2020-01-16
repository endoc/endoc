const Logs = require('./logs.model')
const ReturnObj = require('./../../../models/return-object.model')

module.exports = {
  list: async function (req, res) {
    try {
      const _projectId = req.params.project_id
      console.log(_projectId)
      const _data = await Logs.find({ ProjectId: _projectId }).sort('CreateDate').exec()
      console.log(_data)
      res.status(200).send(new ReturnObj(true, 'MSG_SUCCESS', 200, _data))
    } catch (error) {
      res.status(500).send(new ReturnObj(false, 'ERR_SOMETHING_WENT_WRONG', 500, null))
    }
  },

  view: async function (req, res) {
    // try {
    //   const _projectId = req.params.project_id
    //   const _data = await Project.findById(_projectId).populate('Members', 'Name Surname Username').exec()
    //   res.send(new ReturnObj(false, 'MSG_PROJECT_FOUND', 200, _data))
    // } catch (error) {
    //   res.status(500).send(new ReturnObj(false, 'ERR_SOMETHING_WENT_WRONG', 500, null))
    // }
  },

  save: async function (req, res) {
    try {
      const _log = new Logs(req.body)
      _log.ProjectId = req.headers['authorization']
      console.log(_log)
      const _data = await _log.save()
      console.log(req.headers['authorization'])
      res.status(200).send(new ReturnObj(true, 'MSG_LOG_SAVED', 200, null))
    } catch (error) {
      res.status(500).send(new ReturnObj(false, 'MSG_LOG_NOT_SAVED', 500, null))
    }
  }
}
