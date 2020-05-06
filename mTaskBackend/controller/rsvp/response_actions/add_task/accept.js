const updateTask = require('./update-task')
const updateRSVP = require('./update-rsvp')
const notifyCreator = require('./notify-creator')
const accept = (req, res)=>{
    updateTask(req, 'accept') // taskId, userId
    updateRSVP(req, {isAccepted: true}) // rsvpId
    notifyCreator(req) //creatorId
    res.json('done')
}

module.exports = accept