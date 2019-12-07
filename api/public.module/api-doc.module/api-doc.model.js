const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ApiDocSchema = new Schema({
  ProjectId: { type: Schema.Types.ObjectId, ref: 'Project' },
  PublicHash: String,
  CheckInId: { type: Schema.Types.ObjectId, ref: 'CheckIn' }
})

var ApiDocModel = mongoose.model('ApiDoc', ApiDocSchema)
module.exports = ApiDocModel
