const initialState = []

const users = (state=initialState, action) => {
    switch(action.type){
        case "FETCH_USERS_SUCCESS":
            return [...action.notes]
    
        default:
            return state
    }
}
export default users