
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
        case "UPDATE_NOTE": 
            const editedNotes = state.map(noteObj => {
                if (noteObj.id === action.note.id){
                    return action.note
                } else {
                    return noteObj
                }
            })
            return editedNotes
        case "NOTE_LOGOUT":
            return []
        case "ADD_LIKE":
            const notesWithAddedLikes = state.map(noteObj => {
                if (noteObj.id === action.id){
                    return {...noteObj, likes: noteObj.likes + 1}
                } else {
                    return noteObj
                }
            })
            return notesWithAddedLikes
        case "CHANGE_FAVORITE":
            const notesWithChangedFavorites = state.map(noteObj => {
                if (noteObj.id === action.id){
                    return {...noteObj, favorite: !noteObj.favorite}
                } else {
                    return noteObj
                }
            })
            return notesWithChangedFavorites
        default:
            return state
    }
}
export default notes