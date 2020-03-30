const itemModel = require('../../../model/item')
const getAll = (req, res)=>{
    itemModel.find({type: 'task'}, (err, doc)=>{
        if(!err)
            res.json(doc)
        else
            console.log(err)
    })
}

module.exports = getAll