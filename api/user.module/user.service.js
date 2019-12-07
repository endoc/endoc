const User = require('./user.model')
const ReturnObj = require('./../../models/return-object.model')
const jwtService = require('./../../services/auth/jwt.service')

module.exports = {
  login: async function (req, res) {
    try {
      const _username = req.body.Username
      const _password = req.body.Password

      if (_username && _password) {
        const _user = await User.findOne({ Username: _username }).exec()
        if (_user) {
          var isMatch = await _user.comparePassword(_password)
          if (isMatch) {
            var jwt = await jwtService.generateJwt({ _id: _user._id, Username: _username })
            res.status(200).send(new ReturnObj(true, 'MSG_SUCCESS_LOGIN', 200, jwt))
          } else {
            throw new Error('USER_PSW_NOT_MATCH')
          }
        } else {
          throw new Error('USER_DOES_NOT_EXIST')
        }
      } else {
        throw new Error('USERNAME_OR_PASSWORD_NOT_PROVIDED')
      }
    } catch (error) {
      res.status(200).send(new ReturnObj(false, 'ERR_INVALID_CREDENTIALS', 401, null))
    }
  },

  register: async function (req, res) {
    try {
      const _user = new User(req.body)
      const _existing = await User.findOne({ $or: [{ Username: _user.Username }, { Email: _user.Email }] }).exec()
      if (_existing) {
        throw new Error('ERR_THIS_USER_EXISTS')
      } else {
        const _data = await _user.save()
        var jwt = await jwtService.generateJwt({ _id: _data._id, Username: _data.Username })
        res.status(200).send(new ReturnObj(true, 'MSG_SUCCESS_REGISTER', 200, jwt))
      }
    } catch (error) {
      res.status(200).send(new ReturnObj(false, error.message || 'ERR_SOMETHING_WENT_WRONG', 500, null))
    }
  }
}
