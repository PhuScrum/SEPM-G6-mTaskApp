const notifyNotification = require('./notify-notification')
const notifyAddTasks = (taggedUsers, creatorId, taskId)=>{
    notifyNotification(taggedUsers, creatorId, taskId)
    // notifyPush()
    // notifyEmail()
}

module.exports = notifyAddTasks