const updateTask = require('./update-task')
const updateRSVP = require('./update-rsvp')
const notifyCreator = require('./notify-creator')
const accept = (req, res)=>{
    updateTask(req, 'accept')
    updateRSVP(req, {isAccepted: true})
    notifyCreator(req)
    res.json('done')
}

module.exports = accept