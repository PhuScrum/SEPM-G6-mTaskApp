const sendNotification = require('./send_notification')

const notifyNotification = (taggedUsers, creatorId, taskId)=>{
    var useridArr = taggedUsers.map(unit =>{
        return unit._id
    })
    console.log('notifyNotification: ', useridArr, taggedUsers, creatorId, taskId)
    for(let i =0; i < useridArr.length; i++){
        var userId = useridArr[i]
        sendNotification(userId, creatorId, taskId)
    }


}

module.exports = notifyNotification