
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SALT_WORK_FACTOR = 10

var AppUserSchema = new Schema({
  Name: String,
  Surname: String,
  Email: String,
  Username: { type: String, required: true, index: { unique: true } },
  Password: { type: String, required: true }
})

AppUserSchema.set('autoIndex', false)

AppUserSchema.pre('save', function (next) {
  var user = this
  if (!user.isModified('Password')) return next()

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.Password, salt, function (err, hash) {
      if (err) return next(err)
      user.Password = hash
      next()
    })
  })
})

AppUserSchema.methods.comparePassword = async function (candidatePassword, cb) {
  const result = await bcrypt.compare(candidatePassword, this.Password)
  return result

  // const thisPsw = this.Password
  // bcrypt.compare(candidatePassword, this.Password, function (err, isMatch) {
  //   if (err) return cb(err)
  //   cb(null, isMatch)
  // })
}

AppUserSchema.methods.isValidPassword = async function (candidatePassword) {
  var isValid = await bcrypt.compareSync(candidatePassword, this.Password)
  return isValid
}

var AppUserModel = mongoose.model('AppUser', AppUserSchema)
module.exports = AppUserModel
