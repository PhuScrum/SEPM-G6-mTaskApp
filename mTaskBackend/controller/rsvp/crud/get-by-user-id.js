const rsvpModel = require('../../../model/rsvp')

const getNotifByUserId = (req, res)=>{
    
    rsvpModel.find({receiverId: req.params.userId}, (err, doc)=>{
        if(err)console.log(err)
        else res.json(doc)
    })
    .populate('taskId', ['taggedUsers', 'name', 'creatorId'])
    .sort({ _id: -1 }).limit(10)
    // .then(rsvp => res.json(rsvp))
    
    
}

module.exports = getNotifByUserId