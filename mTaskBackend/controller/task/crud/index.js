const getAll = require('./get-all')
const postTask = require('./post-task')
const editTask = require('./edit-task')
const deleteTask = require('./delete-task')
const CRUD = {
    getAll,
    editTask,
    postTask,
    deleteTask
}

module.exports = CRUD