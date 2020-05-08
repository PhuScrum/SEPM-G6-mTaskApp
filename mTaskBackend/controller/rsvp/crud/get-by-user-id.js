const rsvpModel = require('../../../model/rsvp')

const getNotifByUserId = (req, res)=>{
    
    rsvpModel.find({receiverId: req.params.userId})
    .populate('taskId', ['taggedUsers', 'name'])
    .sort({ _id: -1 }).limit(10)
    .then(rsvp => res.json(rsvp))
    .catch(err=> res.status(500).json(err))
    // .populate('taskId')
}

module.exports = getNotifByUserId