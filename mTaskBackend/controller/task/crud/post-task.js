const itemModel = require('../../../model/item')
const postTask = (req, res)=>{
    itemModel.create(req.body, (err, doc)=>{
        if(!err)
            res.json(doc)
        else
            console.log(err)
    })
}

module.exports = postTask