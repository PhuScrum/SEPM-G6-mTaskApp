import { GET_TASKS, DELETE_TASK, ADD_TASK, EDIT_TASK, GET_MY_TASKS, GET_TASK_ITEM, CLEAR_TASK_ITEM } from './types'
import axios from 'axios';
import _ from 'lodash'
import moment from 'moment-timezone'

function between(x, min, max) {
    return x >= min && x <= max;
}


//get all tasks
export const getTasksAction = (is5days = false) => async dispatch => {
    const res = await axios.get('https://bigquery-project-medium.df.r.appspot.com/task/')
    dispatch({
        type: GET_TASKS,
        payload: is5days ? _.filter(res.data, task=>
            between(moment(task.dateTime).diff(moment(), 'days'), 0, 5)
            ) : res.data
    })
}

//get my tasks
export const getMyTasksAction = (id) => async dispatch => {
    const res = await axios.get(`https://bigquery-project-medium.df.r.appspot.com/tasks-by-user-id/${id}`)
    dispatch({
        type: GET_MY_TASKS,
        payload: res.data
    })
}

//get Task Item
export const getTaskItemAction = (id) => async dispatch => {
    const res = await axios.get(`https://bigquery-project-medium.df.r.appspot.com/task/${id}`)
    dispatch({
        type: GET_TASK_ITEM,
        payload: res.data
    })
}

//delete Task
export const deleteTaskAction = (key) => async dispatch => {
    axios.delete(`https://bigquery-project-medium.df.r.appspot.com/task/${key}`)
        .then(res => dispatch({
            type: DELETE_TASK,
            payload: key
        }))
        // .then(res => dispatch(getTasksAction()))
        .catch(err => console.log(err))
}

//add new Task
export const addTaskAction = (data) => async dispatch => {
    axios.post('https://bigquery-project-medium.df.r.appspot.com/task', data)
        .then(res => {
            dispatch({
                type: ADD_TASK,
                payload: res.data
            })
        })
        // .then(res=>dispatch(getTasksAction))
        .catch(err => console.log(err))
}

//edit Task
export const editTaskAction = (key, data) => async dispatch => {
    axios.put(`https://bigquery-project-medium.df.r.appspot.com/task/${key}`, data)
        .then(res => {
            dispatch({
                type: EDIT_TASK,
                payload: res.data
            })
        })
        // .then(res => dispatch(getTasksAction))
        .catch(err => console.log(err))
}

//clear task item
export const clearTaskItemAction = () => dispatch => {
    dispatch({
        type: CLEAR_TASK_ITEM
    })
}