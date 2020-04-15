const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const itemSchema = new Schema({
  type: {type: String, default: 'task'},
  name: {type: String},
  description: {type: String},
  date: {type: Date},
  completed: {type: Boolean},

  repeat: {type: Object},
  location: {type: String},
  
  listId: {type: Array},
  hostId: {type: String},
  taggedUsers: {type: Array},
  dateCreated: { type: Date, default: Date.now },

})

const itemModel = mongoose.model('item', itemSchema)


module.exports = itemModel