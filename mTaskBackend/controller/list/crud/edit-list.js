const listModel = require('../../../model/list')
const editList = (req, res)=>{
    listModel.updateOne({_id: req.params.id}, req.body, (err, doc)=>{
        if(err)console.log(err)
        else res.json(doc)
    })
}

module.exports = editList