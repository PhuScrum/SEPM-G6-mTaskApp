export function fetchSpecificDate(tasks){
    return {
        type: "getTasksOnSpecificDate",
        tasks
    }
}