const initialState = {}

const user = (state=initialState, action) => {
    switch(action.type){
        case "FETCH_USER_SUCCESS":
            return action.user
    
        default:
            return state
    }
}
export default user