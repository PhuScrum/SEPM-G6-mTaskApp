const getAll = require('./get-all')
const postList = require('./post-list')
const editList = require('./edit-list')
const deleteList = require('./delete-list')
const getListsByUserId = require('./get-list-by-user-id')
const crud = {
    getAll,
    postList,
    editList,
    deleteList,
    getListsByUserId
}

module.exports = crud