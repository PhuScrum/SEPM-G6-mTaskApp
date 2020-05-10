const listModel = require('../../../model/list')
const mongoose = require('mongoose')

const convertStringToObjId = require('../../../helper/convert-to-objectid')

const postList = (req, res)=>{

    req.body.creatorId = convertStringToObjId(req.body.creatorId)

    listModel.create(req.body, (err, doc)=>{
        if(err)console.log(err)
        else res.json(doc)
    })
}

module.exports = postList