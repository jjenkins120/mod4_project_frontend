
export const fetchUserSuccess = (user) => {
    console.log(user)
    return {
        type: 'FETCH_USER_SUCCESS', 
        user: user
    }
}