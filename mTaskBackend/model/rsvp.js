const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const rsvpSchema = new Schema({
  senderId: {type: String, unique: true},
  receiverId: {type: String},
  text: {type: String},
  rsvpType: {type: String},
  
  isAccepted: {type: Boolean, defaule: false},
  isDeclined: {type: Boolean, defaule: false},
  isOpened: {type: Boolean, defaule: false},

  //ref
  taskId: {type: String},
  listId: {type: String},

  dateCreated: { type: Date, default: Date.now },

})

const userModel = mongoose.model('rsvp', rsvpSchema)


module.exports = userModel