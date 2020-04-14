const itemModel = require('../../../model/item')
const getAll = (req, res)=>{
    itemModel.find({type: 'task'})
        .then(tasks => res.json(tasks))
        .catch(err=> res.status(500).json(err))
}

module.exports = getAll