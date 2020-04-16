const initiateState ={
    tasksOnSpecificDate: []
}


export default function calendarOverview(state = initiateState, action){
    switch(action.type){
        case "getTasksOnSpecificDate":
            return {tasksOnSpecificDate: action.tasksOnSpecificDate}
        default: 
            return []
    }
}
