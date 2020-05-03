const listModel = require('../../../model/list')
const getAll = (req, res)=>{
    listModel.find({}, (err, doc)=>{
        if(err)console.log(err)
        else res.json(doc)
    })
}

module.exports = getAll