const itemModel = require('../../../model/item')
const editTask = (req, res)=>{
    itemModel.updateOne({_id: req.params.id}, req.body, (err, doc)=>{
        if(!err)
            res.json(doc)
        else
            console.log(err)
    })
}

module.exports = editTask