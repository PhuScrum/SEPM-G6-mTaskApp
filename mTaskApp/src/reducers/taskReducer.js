import {GET_TASKS, DELETE_TASK, ADD_TASK, EDIT_TASK, GET_MY_TASKS, GET_TASK_ITEM} from '../actions/types'

const initialState = {
    tasks: [],
    taskItem: {}
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_TASKS:
            return {...state, tasks: action.payload}
        case GET_MY_TASKS:
            return {...state, tasks: action.payload}
        case GET_TASK_ITEM:
            return {...state, taskItem: action.payload}
        case DELETE_TASK:
            return {...state}
        case ADD_TASK:
            return {...state}
        case EDIT_TASK:
            return {...state}
        default:
            return state
    }
}


export default reducer