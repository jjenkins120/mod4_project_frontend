
const initialState = []

const notes = (state=initialState, action) => {
    switch(action.type){
        case "FETCH_NOTES_SUCCESS":
            return [...action.notes]
    
        default:
            return state
    }
}
export default notes