const listModel = require('../../../model/list')
const mongoose = require('mongoose')

String.prototype.toObjectId = function () {
    var ObjectId = (mongoose.Types.ObjectId);
    return new ObjectId(this.toString());
};


const editList = (req, res)=>{
    listModel.updateOne({_id: req.params.id}, req.body, (err, doc)=>{
        if(err)console.log(err)
        else res.json(doc)
    })
}

module.exports = editList