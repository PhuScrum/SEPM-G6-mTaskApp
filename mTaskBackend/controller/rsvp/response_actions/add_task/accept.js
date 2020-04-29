const updateTask = require('./update-task')
const updateRSVP = require('./update-rsvp')
const accept = (req, res)=>{
    // updateTask(req, 'accept')
    updateRSVP(req, {isAccepted: true})
    // notifySender(req)
}

module.exports = accept