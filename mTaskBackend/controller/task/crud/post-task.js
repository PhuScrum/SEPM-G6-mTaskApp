const itemModel = require('../../../model/item')
const notifyUsers = require('../../rsvp/notify/add_tasks')
const rsvp_API = require('../../rsvp')
const postTask = (req, res)=>{
    itemModel.create(req.body, (err, doc)=>{
        if(!err){
            if(req.body.taggedUsers){
                var taskId = doc._id
                req.body.taskId = taskId
                rsvp_API.notify.addTask(req)
            }
            res.json(doc)
        }
            
        else
            console.log(err)
    })

    
}

module.exports = postTask



















// req.body.name = 'testing tagging members'
// req.body.taggedUsers = [{_id: '5ea59f3ad636b2061cb01778', isAccepted: false, isConflict: false, isDeclined: false}] // shan
// req.body.creatorId = '5e81fbe288e3dc38b47f39f0' // justin

// const taskObj ={
//     name: 'testing a task',
//     description: 'test',
//     type: 'task',
//     priority: 'C',
//     color: 'green',
//     dateTime: new Date('2020-06-07')
// }