const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const userSchema = new Schema({
  fName: {type: String},
  lName: {type: String},
  displayPhoto: {type: String},
  dateCreated: { type: Date, default: Date.now },

})

const userModel = mongoose.model('user', userSchema)


module.exports = userModel