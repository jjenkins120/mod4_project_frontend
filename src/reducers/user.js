const initialState = {}

const user = (state=initialState, action) => {
    switch(action.type){
        case "FETCH_USER_SUCCESS":
            return action.user
        case "UPDATE_USER":
            return action.user
        case "NEW_USER":
            return action.user
        case "USER_LOGOUT":
            return {}
        case 'CURRENT_USER':
            return action.user
        default:
            return state
    }
}
export default user