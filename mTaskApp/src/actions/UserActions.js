import { GET_ALL_USERS } from "./types"
import axios from 'axios';

//Get All Users
export const getUsersAction = () => async dispatch => {
    const res = await axios.get('https://bigquery-project-medium.df.r.appspot.com/user')
    console.log(res.data)
    dispatch({
        type: GET_ALL_USERS,
        payload: res.data
    })
}
