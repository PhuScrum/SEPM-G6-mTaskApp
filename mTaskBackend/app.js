const mongoose = require('mongoose')
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(cors())


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:123@cluster0-ym27l.mongodb.net/mtask-app?retryWrites=true";

const client = new MongoClient(uri, { useNewUrlParser: true });
mongoose.connect(uri, { useNewUrlParser: true })

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const task_API = require('./controller/task')
const user_API = require('./controller/user')
app.route('/task')
    .get(task_API.CRUD.getAll)
    .post(task_API.CRUD.postTask)

app.route('/task/:id')
    .put(task_API.CRUD.editTask)
    .delete(task_API.CRUD.deleteTask)

app.route('/user')
    .post(user_API.crud.createUser)
var port = 19000
app.listen(port, ()=>{
    console.log('server running at port: ' + port)
})