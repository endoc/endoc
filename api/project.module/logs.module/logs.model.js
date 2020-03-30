const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LogSchema = new Schema({
  ProjectId: { type: Schema.Types.ObjectId, ref: 'Project', index: true },
  Payload: Object,
  CreateDate: { type: Date, default: () => Date.now() }
})

var LogModel = mongoose.model('LogSchema', LogSchema)
module.exports = LogModel
