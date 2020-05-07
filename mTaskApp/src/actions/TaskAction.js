import { GET_TASKS, DELETE_TASK, ADD_TASK, EDIT_TASK, GET_MY_TASKS, GET_TASK_ITEM } from './types'
import axios from 'axios';
import _ from 'lodash'
import moment from 'moment-timezone'
import * as url from '../constants/url/url'
function between(x, min, max) {
    return x >= min && x <= max;
}


//get all tasks
export const getTasksAction = (is5days = false) => async dispatch => {
    const res = await axios.get(url.tasks)
    dispatch({
        type: GET_TASKS,
        payload: is5days ? _.filter(res.data, task=>
            between(moment(task.dateTime).diff(moment(), 'days'), 0, 5)
            ) : res.data
    })
}

//get my tasks
export const getMyTasksAction = (id) => async dispatch => {
    const res = await axios.get(url.tasksByUserId + '/' + id)
    dispatch({
        type: GET_MY_TASKS,
        payload: res.data
    })
}

//get Task Item
export const getTaskItemAction = (id) => async dispatch => {
    const res = await axios.get(url.tasks + '/' + id)
    dispatch({
        type: GET_TASK_ITEM,
        payload: res.data
    })
}

//delete Task
export const deleteTaskAction = (id) => async dispatch => {
    axios.delete(url.tasks + '/' + id)
        .then(res => dispatch({
            type: DELETE_TASK,
            payload: id
        }))
        // .then(res => dispatch(getTasksAction()))
        .catch(err => console.log(err))
}

//add new Task
export const addTaskAction = (data) => async dispatch => {
    axios.post(url.tasks, data)
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
export const editTaskAction = (id, data) => async dispatch => {
    axios.put(url.tasks + '/' + id, data)
        .then(res => {
            dispatch({
                type: EDIT_TASK,
                payload: res.data
            })
        })
        // .then(res => dispatch(getTasksAction))
        .catch(err => console.log(err))
}