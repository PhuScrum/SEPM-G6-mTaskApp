import {GET_TASKS, DELETE_TASK} from '../actions/types'

const initialState = {
    tasks: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_TASKS:
            return {...state, tasks: action.payload}
        case DELETE_TASK:
            return {...state}
        default:
            return state
    }
}


export default reducer