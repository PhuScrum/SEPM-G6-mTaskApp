const notifyAddTasks = (req, res)=>{
    notifyNotification()
    notifyPush()
    notifyEmail()
}

module.exports = notifyAddTasks