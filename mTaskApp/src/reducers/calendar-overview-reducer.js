import {STORE_DATEHASHMAP} from '../actions/types'
const initiateState ={
    tasksOnSpecificDate: [],
    dateHashMap: {}
}


export default function calendarOverview(state = initiateState, action){
    switch(action.type){
        case "getTasksOnSpecificDate":
            return {tasksOnSpecificDate: action.tasksOnSpecificDate}
        case STORE_DATEHASHMAP:
            return {dateHashMap: action.dateHashMap}
        default: 
            return []
    }
}
