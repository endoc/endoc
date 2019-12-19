const mongoose = require('mongoose')

var HeaderSchema = new mongoose.Schema({
  Key: String,
  Value: String,
  Description: String
})

var ParameterSchema = new mongoose.Schema({
  IsRequired: Boolean,
  Type: String,
  ParameterName: String,
  ParameterDataType: String
})

var ResponseSchema = new mongoose.Schema({
  StatusCode: Number,
  Content: String
})

const EndpointSchema = new mongoose.Schema({
  ProjectId: mongoose.Schema.Types.ObjectId,
  Method: String,
  Path: String,
  Description: String,
  Parameters: [ParameterSchema],
  ParametersRaw: String,
  ResponseExample: String,
  Responses: [ResponseSchema],
  IsProtected: Boolean,
  Headers: [HeaderSchema]
})

var EndpointModel = mongoose.model('Endpoint', EndpointSchema)

module.exports = EndpointModel
