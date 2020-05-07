const listModel = require('../../../model/list')
const getListsByUserId = (req, res)=>{
    listModel.find({creatorId: req.params.id}, (err, doc)=>{
        if(err)console.log(err)
        else res.json(doc)
    })
}

module.exports = getListsByUserId