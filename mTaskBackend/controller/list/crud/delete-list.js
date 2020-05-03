const listModel = require('../../../model/list')
const deleteList = (req, res)=>{
    listModel.deleteOne({_id: req.params.id}, (err, doc)=>{
        if(!err)
            res.json(doc)
        else
            console.log(err)
    })
}

module.exports = deleteList