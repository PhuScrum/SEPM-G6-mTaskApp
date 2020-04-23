const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const rsvpSchema = new Schema({
  senderId: {type: String, unique: true},
  receiverId: {type: String},
  message: {type: String},
  rsvpType: {type: String},
  
  isAccepted: {type: Boolean, defaule: false},
  isDeclined: {type: Boolean, defaule: false},
  isOpened: {type: Boolean, defaule: false},

  dateCreated: { type: Date, default: Date.now },

})

const userModel = mongoose.model('rsvp', rsvpSchema)


module.exports = userModel