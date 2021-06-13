const Project = require('./project.model')
const Endpoint = require('./endpoint.module/endpoint.model')
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
  },

  getPostmanMaterial: async function (req, res) {
    try {
      const _projectId = req.params.project_id
      const _project = await Project.findById(_projectId).select('Title -_id').exec()
      const _endpoints = await Endpoint.find({ProjectId: _projectId}).select('Headers Parameters Path Method Description -_id').exec()

      let postmanResponse = {
        info: {
          name: _project.Title,
          schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
        },
        item: _endpoints.map(e => {
          return {
            name: e.Path,
            request: {
              method: e.Method,
              description: e.Description,
              header: e.Headers?.map(h => { return { key: h.Key, value: h.Value, type: 'text' } }) || [],
              url: {
                raw: e.Path,
                host: e.Path.split('.'),
                query: e.Parameters?.filter(p => p.Type === 'URL').map(p => { return { key: p.ParameterName, value: '' } }) || []
              }
            }
          }
        })
      }



      console.log(postmanResponse)

      res.send(new ReturnObj(false, 'MSG_PROJECT_FOUND', 200, postmanResponse))
    } catch (error) {
      res.status(500).send(new ReturnObj(false, 'ERR_SOMETHING_WENT_WRONG', 500, null))
    }
  }
}
