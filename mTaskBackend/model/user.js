const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {type: String, unique: true},
  fName: {type: String},
  lName: {type: String},
  displayPhoto: {type: String},
  dateCreated: { type: Date, default: Date.now },

})

module.exports = userModel = mongoose.model('user', userSchema)