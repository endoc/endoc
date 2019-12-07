const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ProjectSchema = require('../project.model').schema
const EndpointSchema = require('../endpoint.module/endpoint.model').schema

const CheckInSchema = new mongoose.Schema({
  Title: String,
  ProjectId: { type: Schema.Types.ObjectId, ref: 'Project', index: true },
  Project: ProjectSchema,
  Endpoints: [EndpointSchema],
  CheckInDate: { type: Date, default: () => { return new Date() } }
})

const CheckInModel = mongoose.model('CheckIn', CheckInSchema)

module.exports = CheckInModel
