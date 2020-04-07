const itemModel = require('../../../model/item')
const postTask = (req, res)=>{
    itemModel.create(req.body, (err, doc)=>{
        if(!err)
            res.json(doc)
        else
            console.log(err)
    })
}

module.exports = postTask

// const taskObj ={
//     name: 'testing a task',
//     description: 'test',
//     type: 'task',
//     priority: 'C',
//     color: 'green',
//     dateTime: new Date('2020-06-07')
// }