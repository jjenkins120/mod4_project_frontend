
export const fetchUsersSuccess = (users) => {
    return {
        type: 'FETCH_USERS_SUCCESS', 
        users: users
    }
}