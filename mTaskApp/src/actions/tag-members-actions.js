import {SET_ITEMS_TO_SELECTED, REMOVE_ITEMS_FROM_SELECTED} from './types'

export const setItemsToSelected = (items)=>{
    return {
        type: SET_ITEMS_TO_SELECTED,
        items
    }
}

export const removeItemsFromSelected = (items)=>{
    return {
        type:REMOVE_ITEMS_FROM_SELECTED,
        items
    }
}