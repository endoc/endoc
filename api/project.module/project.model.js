const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  Title: String,
  Description: String,
  Members: [{ type: Schema.Types.ObjectId, ref: 'AppUser' }],
  CreatedBy: Schema.Types.ObjectId,
  CreateDate: { type: Date, default: Date.now() }
})

var ProjectModel = mongoose.model('Project', ProjectSchema)
module.exports = ProjectModel
