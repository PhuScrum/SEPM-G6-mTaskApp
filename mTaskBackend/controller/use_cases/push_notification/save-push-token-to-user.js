const userModel = require('../../../model/user')

const savePushTokenToUser = (req, res)=>{
    const {userid} = req.params
    const {expoPushToken} = req.body
    userModel.updateOne({_id: userid}, {expoPushToken}, (req, res)=>{
        if(err)console.log(err)
        else res.json(doc)
    })
}

module.exports = savePushTokenToUser