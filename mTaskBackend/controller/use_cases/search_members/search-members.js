const userModel = require('../../../model/user')

/**  partial search with Regex. mongoose query.
  *  search fields: first name, last name and email. 
  *  limit results with only 8
  *   handle string == '', which gives all results.
  * 
 */
const searchMembers = (req, res) => {
    var searchTerm = req.body.searchTerm
    if (searchTerm !== '') {
        var query = { $or: [{ fullName: new RegExp(searchTerm, "i") }, { fName: new RegExp(searchTerm, "i") }, { lName: new RegExp(searchTerm, "i") }, { email: new RegExp(searchTerm, "i") }] }
        console.log('search ' + searchTerm)
        userModel.find(query, '_id fName lName email userImage fullName', function (err, doc) {
            if (err) {
                console.log(err)
                res.json('error')
            }
            else {
                var docResult = doc.slice(0, 9)
                console.log(doc.length)
                res.json(docResult)
            }
        })
    }else{
        res.json([])
    }
}

module.exports = searchMembers