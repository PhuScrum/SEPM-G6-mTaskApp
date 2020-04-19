import {GET_TASKS, DELETE_TASK} from './types'
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
}