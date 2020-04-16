import {GET_TASKS} from './types'
import axios from 'axios';


//get all tasks
export const getTasksAction =() => async dispatch=> {
    const res = await axios.get('https://bigquery-project-medium.df.r.appspot.com/task/') 
        dispatch({
            type: GET_TASKS,
            payload: res.data
        })
}