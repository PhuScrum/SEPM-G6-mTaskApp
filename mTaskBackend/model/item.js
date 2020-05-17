const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const itemSchema = new Schema({
  type: {type: String, default: 'task'},
  name: {type: String},
  description: {type: String},
  dateTime: {type: Date},
  priority: {type: String},
  color: {type: String},
  reminderId : {type: String},

  completed: {type: Boolean, default: false},

  repeat: {type: Object},
  location: {type: String},
  
  listId: {type: Array},
  creatorId: {type: String},
  taggedUsers: {type: Array},
  dateCreated: { type: Date, default: Date.now },

})

const itemModel = mongoose.model('item', itemSchema)


module.exports = itemModel