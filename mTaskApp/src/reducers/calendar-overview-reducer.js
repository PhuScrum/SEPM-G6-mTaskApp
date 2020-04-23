import {STORE_DATEHASHMAP, GET_TASKS_ON_SPECIFIC_DATE} from '../actions/types'
const initiateState ={
    tasksOnSpecificDate: [],
    dateHashMap: {}
}


export default function calendarOverview(state = initiateState, action){
    switch(action.type){
        case GET_TASKS_ON_SPECIFIC_DATE:
            return {tasksOnSpecificDate: action.tasksOnSpecificDate}
        case STORE_DATEHASHMAP:
            return {dateHashMap: action.dateHashMap}
        default: 
            return []
    }
}
