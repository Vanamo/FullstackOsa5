const initialState = {
  message: null,
  style: null
}

const reducer = (state = initialState, action) => {
  if (action.type === 'SUCCESS') {
    const message = action.message
    const style = action.style
    return { message, style }
  }
  if (action.type === 'ERROR') {
    const message = action.message
    const style = action.style
    return { message, style }
  }
  if (action.type === 'HIDE_NOTIFICATION') {
    return initialState
  }
  return state
}

export const newSuccessNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SUCCESS',
      message,
      style: 'success'
    })
    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, time * 1000)
  }
}

export const newErrorNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'ERROR',
      message,
      style: 'error'
    })
    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, time * 1000)
  }
}

export default reducer