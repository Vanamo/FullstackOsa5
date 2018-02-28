const initialState = {
  username: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user
  }
  return state
}

export const setUser = (userData) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_USER',
      user: userData.user
    })
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: 'SET_USER',
      user: initialState
    })
  }
}

export default reducer