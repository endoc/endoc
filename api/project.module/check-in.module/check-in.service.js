const CheckIn = require('./check-in.model')
const Project = require('../project.model')
const Endpoint = require('../endpoint.module/endpoint.model')

const ReturnObj = require('../../../models/return-object.model')

module.exports = {
  list: async function (req, res) {
    try {
      const _projectId = req.params.project_id
      const _data = await CheckIn.find({ ProjectId: _projectId }).exec()
      res.status(200).send(new ReturnObj(true, 'MSG_SUCCESS', 200, _data))
    } catch (error) {
      res.status(500).send(new ReturnObj(false, 'ERR_SOMETHING_WENT_WRONG', 500, null))
    }
  },

  save: async function (req, res) {
    try {
      const _projectId = req.params.project_id
      const _check_in = new CheckIn(req.body)
      _check_in.ProjectId = _projectId
      _check_in.Project = await Project.findById(_projectId).select('-_id Title Description').exec()
      _check_in.Endpoints = await Endpoint.find({ ProjectId: _projectId }).sort('Path').exec()
      await _check_in.save()
      res.send(new ReturnObj(true, 'MSG_CHECKED_IN_SUCCESSFULLY', 200, {}))
    } catch (error) {
      res.status(500).send(new ReturnObj(false, 'ERR_NOT_CHECKED_IN', 500, null))
    }
  },

  view: async function (req, res) {
    try {
      const _data = await this.internal.get_check_in(req)
      res.send(new ReturnObj(false, 'MSG_CHECK_IN_FOUND', 200, _data))
    } catch (error) {
      res.status(500).send(new ReturnObj(false, 'ERR_CHECK_IN_WAS_NOT_FOUND', 500, null))
    }
  },

  internal: {
    get_check_in: async function (req) {
      try {
        const _check_in_id = req.params.check_in_id
        const _data = await CheckIn.findById(_check_in_id).exec()
        return _data
      } catch (error) {
        throw new Error('ERR_CHECK_IN_WAS_NOT_FOUND')
      }
    }
  }
}
