const itemModel = require('../../../../model/item')
const updateTask = (req, type)=>{
    const {taskId, userId} = req.body
    req.body.taskId = '5ea96bb938802413a83c6e11'
    req.body.userId = '5ea59f3ad636b2061cb01778'
    // var str = 'taggedUsers.$.isDeclined'
    // if(type ==='accept'){
    //     str='taggedUsers.$.isAccepted'
    // }
    itemModel.updateOne({ _id: req.body.taskId, 'taggedUsers._id': req.body.userId }, { '$set': { 'taggedUsers.$.isAccepted': true } }
            ,  (err, doc)=> {
                if (err) {
                    console.log('wrong projectId',err)
                } else {

                }
            })
}

module.exports = updateTask