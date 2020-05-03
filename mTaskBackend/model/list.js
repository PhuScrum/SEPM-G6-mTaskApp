const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const listSchema = new Schema({
  name: {type: String},
  description: {type: String},
  items: {type: Array},
  creatorId: {type: String},
  taggedUsers: {type: Array},
  dateCreated: { type: Date, default: Date.now },

})

const itemModel = mongoose.model('list', listSchema)


module.exports = itemModel