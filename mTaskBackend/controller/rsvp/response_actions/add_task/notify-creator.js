const sendNotification = require('./send-notification')
const notifyCreator = (req)=>{
    sendNotification(req)
}

module.exports = notifyCreator