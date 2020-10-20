

export const fetchNotesSuccess = (notes) => {
    return {
        type: 'FETCH_NOTES_SUCCESS', 
        notes: notes
    }
}

export const deleteNote = (id) => {
    return {
        type: 'DELETE_NOTE',
        id: id
    }
}

export const addNote = (note) => {
    return {
        type: 'ADD_NOTE',
        note: note
    }
}

export const updateNote = (id) => {
    return {
        type: 'UPDATE_NOTE',
        id: id
    }
}