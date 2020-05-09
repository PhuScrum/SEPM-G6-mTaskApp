const listModel = require('../../../model/list')
const mongoose = require('mongoose')

String.prototype.toObjectId = function () {
    var ObjectId = (mongoose.Types.ObjectId);
    return new ObjectId(this.toString());
};


const postList = (req, res)=>{

    req.body.creatorId = req.body.creatorId.toObjectId()

    listModel.create(req.body, (err, doc)=>{
        if(err)console.log(err)
        else res.json(doc)
    })
}

module.exports = postList