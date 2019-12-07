const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PublishSchema = new Schema({
  ProjectId: { type: Schema.Types.ObjectId, ref: 'Project', index: true },
  PublicHash: { type: String, index: true },
  CheckInId: { type: Schema.Types.ObjectId, ref: 'CheckIn' }
})

var PublishModel = mongoose.model('Publish', PublishSchema)
module.exports = PublishModel
