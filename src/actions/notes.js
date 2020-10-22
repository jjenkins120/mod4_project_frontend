

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

export const updateNote = (note) => {
    return {
        type: 'UPDATE_NOTE',
        note: note
    }
}

export const noteLogout = () => {
    return {
        type: 'NOTE_LOGOUT',
    }
}

export const addLike = (id) => {
    return {
        type: 'ADD_LIKE',
        id: id
    }
}

export const changeFavorite = (id) => {
    return {
        type: 'CHANGE_FAVORITE',
        id: id
    }
}