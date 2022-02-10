let nullTimeout

const successNotificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_SUCCESS_NOTIF':
            return action.notification
        default:
            return state
    }
}

export const successNotificationChange = (message, time) => {
    return async dispatch => {
        clearTimeout(nullTimeout)
        dispatch({
            type: 'SET_SUCCESS_NOTIF',
            notification: message,
        })
        nullTimeout = setTimeout(() => dispatch({
            type: 'SET_SUCCESS_NOTIF',
            notification: null,
        }), time*1000)
    }
}
  
export default successNotificationReducer