const Publish = require('./publish.model')
const CheckIn = require('./../check-in.model')
const ReturnObj = require('./../../../../models/return-object.model')
const crypto = require('crypto')

module.exports = {
  add: async function (req, res) {
    try {
      const _projectId = req.params.project_id
      const _check_in_id = req.params.check_in_id
      const _check_in = await CheckIn.findById(_check_in_id).select('_id').exec()

      const _publish_exists = await Publish.exists({ ProjectId: _projectId })
      if (_publish_exists) {
        const _data = await Publish.findOneAndUpdate({ ProjectId: _projectId }, { CheckInId: _check_in._id }, { new: true }).select('-_id PublicHash').exec()
        res.status(200).send(new ReturnObj(true, 'MSG_UPDATED_PUBLISH', 200, _data.PublicHash))
        return _data
      } else {
        const p = {
          ProjectId: _projectId,
          PublicHash: await crypto.createHash('md5').update(_projectId).digest('hex'),
          CheckInId: _check_in._id
        }
        const _publish = new Publish(p)
        await _publish.save()
        res.status(200).send(new ReturnObj(true, 'MSG_NEW_PUBLISH', 200, p.PublicHash))
      }
    } catch (error) {
      res.status(500).send(new ReturnObj(false, 'MSG_NOT_PUBLISHED', 500, null))
    }
  },

  view: async function (req, res) {
    try {
      const _projectId = req.params.project_id
      const _data = await Publish.findOne({ ProjectId: _projectId }).select('PublicHash CheckInId').populate('CheckInId', 'CheckInDate Title').exec()
      if (_data) {
        res.status(200).send(new ReturnObj(true, 'MSG_PUBLISH_EXISTS', 200, _data))
      } else {
        res.status(200).send(new ReturnObj(true, 'MSG_NO_PUBLISH_EXISTS', 401, {}))
      }
    } catch (error) {
      res.status(500).send(new ReturnObj(false, 'msg_something_went_wrong', 500, null))
    }
  },

  delete: async function (req, res) {
    try {
      const publish_id = req.params.publish_id
      await Publish.findByIdAndDelete(publish_id).exec()
      res.status(200).send(new ReturnObj(true, 'MSG_PUBLISH_DELETED', 200, null))
    } catch (error) {
      res.status(500).send(new ReturnObj(false, 'ERR_PUBLISH_NOT_DELETED', 200, null))
    }
  },

  public: {
    view: async function (req, res) {
      try {
        const api_doc_hash = req.params.api_doc_id
        const _data = await Publish.findOne({ PublicHash: api_doc_hash }).populate('CheckInId', '-_id').select('-_id CheckInId').exec()
        // console.log(_data.Endpoints[0])
        res.status(200).send(new ReturnObj(true, 'MSG_API_DOC_FOUND', 200, _data ? _data.CheckInId : undefined))
      } catch (error) {
        res.status(500).send(new ReturnObj(false, 'MSG_API_DOC_NOT_FOUND', 500, null))
      }
    }
  }
}
