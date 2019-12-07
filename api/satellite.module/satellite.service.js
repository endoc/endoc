const Satellite = require('./satellite.model')
const ReturnObj = require('./../../models/return-object.model')

module.exports = {
  view: async function (req, res) {
    try {
      const _satelliteId = req.params.satellite_id
      const _data = await Satellite.findOne({ SatelliteId: _satelliteId }).select('-_id Cargo').exec()
      res.send(new ReturnObj(false, 'MSG_SUCCESS', 200, _data ? _data.Cargo : []))
    } catch (error) {
      res.status(500).send(new ReturnObj(false, 'ERR_SOMETHING_WENT_WRONG', 500, null))
    }
  }
}
