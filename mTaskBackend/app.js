const mongoose = require('mongoose')
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
// app.use(cors())

//Test Server
app.get('/', (req, res) => {
    res.status(200).send('Hello, world!').end();
  });

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:123@cluster0-ym27l.mongodb.net/mtask-app?retryWrites=true";

const client = new MongoClient(uri, { useNewUrlParser: true });
mongoose.connect(uri, { useNewUrlParser: true })

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const task_API = require('./controller/task')
const user_API = require('./controller/user')
const auth_API = require('./controller/user/authentication')
const useCase_API = require('./controller/use_cases')

app.route('/task')
    .get(task_API.crud.getAll)
    .post(task_API.crud.postTask)

app.route('/task/:id')
    .put(task_API.crud.editTask)
    .delete(task_API.crud.deleteTask)

app.route('/tasks-on-specific-date')
    .post(task_API.crud.getTaskSpecificDate)

app.route('/user')
    .get(user_API.crud.getAll)
    .post(user_API.crud.createUser)
    .delete(user_API.crud.deleteUser)

app.route('/user/:id')
  .get(user_API.crud.getUserById)

app.route('/get-user-by-email')
  .post(user_API.crud.getUserByEmail)

app.route('/simple-facebook-login')
  .post(auth_API.simpleFbLogin)

app.route('/search-members')
  .post(useCase_API.searchMembers)

app.route('/notify-user')
//   .post()
var port = process.env.PORT || 19003
app.listen(port, ()=>{
    console.log('server running at port: ' + port)
})