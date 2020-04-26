const createUser = require('./create-user')
const getUserById = require('./get-user-by-id')
const getUserByEmail = require('./get-user-by-email')
const getAll = require('./get-all-users')
const crud = {
    createUser,
    getUserById,
    getUserByEmail,
    getAll
}

module.exports = crud