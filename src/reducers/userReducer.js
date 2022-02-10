import userService from '../services/user'
import { errorNotificationChange } from './errorNotificationReducer'

const userReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_USERS':
        return action.data
    default:
      return state
  }
}

export const initializeUsers = () => {
    return async dispatch => {
        try {
            const users = await userService.getAll()
            dispatch({
                type: 'INIT_USERS',
                data: users,
            })
        } catch {
            dispatch(errorNotificationChange('Server error', 10))
        }
    }
}

export default userReducer