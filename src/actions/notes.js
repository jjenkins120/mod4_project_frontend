

export const fetchNotesSuccess = (notes) => {
    return {
        type: 'FETCH_NOTES_SUCCESS', 
        notes: notes
    }
}