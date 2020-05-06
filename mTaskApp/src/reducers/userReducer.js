import { GET_USER, GET_ALL_USERS } from "../actions/types"

const initialState = {
    
    users: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_USERS:
            return { ...state, users: action.payload }
        default:
            return state
    }
}

export default reducer