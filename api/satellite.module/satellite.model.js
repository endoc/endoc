const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SatelliteSchema = new Schema({
  SatelliteId: String,
  Cargo: [Object]
})

var SatelliteModel = mongoose.model('Satellite', SatelliteSchema)

module.exports = SatelliteModel
