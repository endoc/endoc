const Endpoint = require('./endpoint.model')
const ReturnObj = require('./../../../models/return-object.model')

module.exports = {
  list: async function (req, res) {
    try {
      const _projectId = req.params.project_id
      const _data = await Endpoint.find({ ProjectId: _projectId }).select('_id Path Method').sort('Path').exec()
      res.status(200).send(new ReturnObj(true, 'MSG_SUCCESS', 200, _data))
    } catch (error) {
      res.status(500).send(new ReturnObj(false, 'ERR_SOMETHING_WENT_WRONG', 500, null))
    }
  },

  view: async function (req, res) {
    try {
      const _projectId = req.params.project_id
      const _endpointId = req.params.endpoint_id
      const _data = await Endpoint.findOne({ _id: _endpointId, ProjectId: _projectId }).exec()
      res.send(new ReturnObj(false, 'MSG_ENDPOINT_FOUND', 200, _data))
    } catch (error) {
      res.status(500).send(new ReturnObj(false, 'ERR_ENDPOINT_WAS_FOUND', 500, null))
    }
  },

  save: async function (req, res) {
    try {
      const _endpoint = new Endpoint(req.body)
      const _data = await _endpoint.save()
      res.status(200).send(new ReturnObj(true, 'MSG_ENDPOINT_CREATED', 200, _data))
    } catch (error) {
      res.status(500).send(new ReturnObj(false, 'ERR_PROJECT_NOT_CREATED', 500, null))
    }
  },

  edit: async function (req, res) {
    try {
      const _endpointId = req.params.endpoint_id
      const _endpoint = new Endpoint(req.body)
      const _data = await Endpoint.findByIdAndUpdate(_endpointId, _endpoint, { new: true }).exec()
      res.status(200).send(new ReturnObj(true, 'MSG_UPDATED', 200, _data))
    } catch (error) {
      res.status(500).send(new ReturnObj(false, 'ERR_SOMETHING_WENT_WRONG', 500, null))
    }
  }
}
