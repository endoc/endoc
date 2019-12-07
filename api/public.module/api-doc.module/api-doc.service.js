const ApiDoc = require('./api-doc.model')
const ReturnObj = require('./../../../models/return-object.model')

module.exports = {
  view: async function (req, res) {
    try {
      const _api_doc_hash = req.params.api_doc_id
      const _data = await ApiDoc.findOne({ PublicHash: _api_doc_hash }).populate('CheckInId', '-_id').select('-_id CheckInId').exec()
      res.send(new ReturnObj(false, 'MSG_API_DOC_FOUND', 200, _data ? _data.CheckInId : undefined))
    } catch (error) {
      res.status(500).send(new ReturnObj(false, 'MSG_API_DOC_NOT_FOUND', 500, null))
    }
  },
}
