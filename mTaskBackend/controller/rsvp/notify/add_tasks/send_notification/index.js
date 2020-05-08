const rsvpModel = require('../../../../../model/rsvp')
const findTaskById = require('../../../../../helper/find-task-by-id')
const findUserById = require('../../../../../helper/find-user-by-id')

String.prototype.toObjectId = function () {
    var ObjectId = (mongoose.Types.ObjectId);
    return new ObjectId(this.toString());
};

const sendNotification = async (receiverId, senderId, taskId)=>{
    var task = await findTaskById(taskId)
    var sender = await findUserById(senderId)
    var taskName = task.name
    var senderName = sender.fName + ' ' +  sender.lName
    var text = senderName + ' tag you in ' + taskName
    console.log('testing sendNotification: ')
    console.log(text)
    
    const rsvp  = {
        senderId: senderId.toObjectId(),
        receiverId: receiverId.toObjectId(),
        text,
        rsvpType: 'rsvp',

        isDeclined: false,
        isAccepted: false,
        taskId: taskId.toObjectId()
    }

    rsvpModel.create(rsvp, (err, doc)=>{
        if(err)console.log(err)
        else console.log(doc)
    })
}

module.exports = sendNotification