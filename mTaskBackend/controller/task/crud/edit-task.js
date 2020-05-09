const itemModel = require('../../../model/item')
const mongoose = require('mongoose')

String.prototype.toObjectId = function () {
    var ObjectId = (mongoose.Types.ObjectId);
    return new ObjectId(this.toString());
};

const editTask = (req, res)=>{
    // req.body.creatorId = req.body.creatorId.toObjectId()
   itemModel.findByIdAndUpdate(req.params.id, req.body, (err, doc)=>{
        if(!err)
            res.json(doc)
        else
            console.log(err)
    })
}

module.exports = editTask