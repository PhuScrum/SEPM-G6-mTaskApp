const itemModel = require('../../../model/item')


const getTaskByUserId = (req, res)=>{
    // fetch tasks by creatorId and accepted in tagged users in task.z
    var query = {$or: [{type: 'task', creatorId: req.params.id}, {taggedUsers: {$elemMatch:{_id: req.params.id, isAccepted: true}}}]}
    itemModel.find(query, (err, doc)=>{
        if(err)console.log(err)
        else res.json(doc)
    })
        
}

module.exports = getTaskByUserId