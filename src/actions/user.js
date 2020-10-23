
export const fetchUserSuccess = (user) => {
    return {
        type: 'FETCH_USER_SUCCESS', 
        user: user
    }
}

export const updateUser = (user) => {
    return {
        type: 'UPDATE_USER',
        user: user
    }
}

export const newUser = (user) => {
    return {
        type: 'NEW_USER',
        user: user
    }
}

export const userLogout = () => {
    return {
        type: 'USER_LOGOUT'
    }
}

export const currentUser  = (user) => {
    return {
      type: 'CURRENT_USER',
      user: user
    }
  }