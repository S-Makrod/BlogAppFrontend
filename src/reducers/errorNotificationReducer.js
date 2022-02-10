let nullTimeout

const errorNotificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_ERROR_NOTIF':
            return action.notification
        default:
            return state
    }
}

export const errorNotificationChange = (message, time) => {
    return async dispatch => {
        clearTimeout(nullTimeout)
        dispatch({
            type: 'SET_ERROR_NOTIF',
            notification: message,
        })
        nullTimeout = setTimeout(() => dispatch({
            type: 'SET_ERROR_NOTIF',
            notification: null,
        }), time*1000)
    }
}
  
export default errorNotificationReducer