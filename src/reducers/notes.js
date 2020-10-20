
const initialState = []

const notes = (state=initialState, action) => {
    switch(action.type){
        case "FETCH_NOTES_SUCCESS":
            return [...action.notes]
        case "DELETE_NOTE":
            const updatedNotes = state.filter(noteObj => {
                if (noteObj.id !== action.id){
                    return noteObj
                }
            })
            return updatedNotes
        case "ADD_NOTE":
            return [...state,action.note]
        // case "UPDATE_NOTE": NEED LOGIC HERE
            

        default:
            return state
    }
}
export default notes