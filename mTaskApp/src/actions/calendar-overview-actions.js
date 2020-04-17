import {STORE_DATEHASHMAP} from './types'
export function fetchSpecificDate(tasks){
    return {
        type: "getTasksOnSpecificDate",
        tasks
    }
}

export const storeDateHashMap = (dateHashMap)=>{
    return {
        type: STORE_DATEHASHMAP,
        dateHashMap
    }
}