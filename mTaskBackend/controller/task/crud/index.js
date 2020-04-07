const getAll = require('./get-all')
const postTask = require('./post-task')
const editTask = require('./edit-task')
const deleteTask = require('./delete-task')
const getTaskSpecificDate = require('./get-task-specific-date')
const CRUD = {
    getAll,
    editTask,
    postTask,
    deleteTask,
    getTaskSpecificDate
}

module.exports = CRUD