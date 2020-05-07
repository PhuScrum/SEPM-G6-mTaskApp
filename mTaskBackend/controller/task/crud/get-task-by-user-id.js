const itemModel = require('../../../model/item')


const getTaskByUserId = (req, res)=>{
    itemModel.find({type: 'task', creatorId: req.params.id}, (err, doc)=>{
        if(err)console.log(err)
        else res.json(doc)
    })
        
}

module.exports = getTaskByUserId