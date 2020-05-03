const listModel = require('../../../model/list')
const postList = (req, res)=>{
    listModel.create(req.body, (err, doc)=>{
        if(err)console.log(err)
        else res.json(doc)
    })
}

module.exports = postList