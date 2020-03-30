const itemModel = require('../../../model/item')
const deleteTask = (req, res)=>{
    itemModel.deleteOne({_id: req.params.id}, (err, doc)=>{
        if(!err)
            res.json(doc)
        else
            console.log(err)
    })
}

module.exports = deleteTask