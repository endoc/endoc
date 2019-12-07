/**
 * Standard object to be returned by our API
 *
 * @param {boolean} _success Tells if request was successfull
 * @param {string} _msg Message to be viewed by user
 * @param {number} _status HTTP status to be returned (For internal use)
 * @param {any} _data Data that user has requested
 */
function ReturnObj (_success, _msg, _status, _data) {
  this.success = _success
  this.message = _msg
  this.status = _status
  this.data = _data
}

module.exports = ReturnObj
