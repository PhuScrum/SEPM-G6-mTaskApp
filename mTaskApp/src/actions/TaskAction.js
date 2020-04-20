import {GET_TASKS, DELETE_TASK, ADD_TASK, EDIT_TASK} from './types'
import axios from 'axios';


//get all tasks
export const getTasksAction =() => async dispatch=> {
    const res = await axios.get('https://bigquery-project-medium.df.r.appspot.com/task/') 
        dispatch({
            type: GET_TASKS,
            payload: res.data
        })
}

//delete Task
export const deleteTaskAction = (key) => async dispatch => {
    axios.delete(`https://bigquery-project-medium.df.r.appspot.com/task/${key}`)
        .then(res=> dispatch({
            type: DELETE_TASK,
            payload: key
        }))
        .then(res=> dispatch(getTasksAction()))
        .catch(err=>console.log(err))
}

//add new Task
export const addTaskAction = (data) => async dispatch => {
    axios.post('https://bigquery-project-medium.df.r.appspot.com/task', data)
    .then(res=>{
        dispatch({
            type: ADD_TASK,
            payload: res.data
        })
    })
    // .then(res=>dispatch(getTasksAction))
    .catch(err=>console.log(err))
}

//edit Task
export const editTaskAction = (key, data) => async dispatch => {
    axios.put(`https://bigquery-project-medium.df.r.appspot.com/task/${key}`, data)
    .then(res=>{
        dispatch({
            type: EDIT_TASK,
            payload: res.data
        })
    })
    .then(res=>dispatch(getTasksAction))
    .catch(err=>console.log(err))
}