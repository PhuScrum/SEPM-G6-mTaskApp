const rsvpModel = require('../../../../../model/rsvp')
const findTaskById = require('./find-task-by-id')
const findUserById = require('./find-user-by-id')
const sendNotification = async (receiverId, senderId, taskId)=>{
    var task = await findTaskById(taskId)
    var sender = await findUserById(senderId)
    var taskName = task.name
    var senderName = sender.fName + ' ' +  sender.lName
    var text = senderName + ' tag you in ' + taskName
    console.log('testing sendNotification: ')
    console.log(text)
    
    // const rsvp  = {
    //     senderId,
    //     receiverId,
    //     text,
    //     rsvpType: 'rsvp',

    //     isDeclined: false,
    //     isAccepted: false,
    //     taskId
    // }

    // rsvpModel.create(rsvp, (err, doc)=>{
    //     if(err)console.log(err)
    //     else console.log(doc)
    // })
}

module.exports = sendNotification