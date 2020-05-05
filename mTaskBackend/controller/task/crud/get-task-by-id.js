const itemModel = require('../../../model/item')

const getTaskById = (req, res)=>{
    itemModel.findOne({type: 'task', _id: req.params.id}, (err, doc)=>{
        if(err)console.log(err)
        else res.json(doc)
    })
        
}

module.exports = getTaskById