import blogService from '../services/blog'
import commentService from '../services/comment'
import loginService from '../services/login'
import { successNotificationChange } from './successNotificationReducer'
import { errorNotificationChange } from './errorNotificationReducer'

const loginReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.user
        case 'SET_USER':
            return action.user
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

export const login = (credentials, create=false) => {
    return async dispatch => {
        try{ 
            const user = await loginService.login(credentials)
            blogService.setToken(user.token)
            commentService.setToken(user.token)
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user)) 
            if (create) {
                dispatch(successNotificationChange('Your user was successfully created, you are now logged in!', 5))
            } else {
                dispatch(successNotificationChange('Successfully logged in', 5))
            }
            dispatch({  
                type: 'LOGIN',
                user: user,
            })
        } catch {
            dispatch(errorNotificationChange('Wrong username or password', 5))
        }
    }
}

export const logout = (sessionEnd=false) => {
    return async dispatch => {
        blogService.setToken(null)
        commentService.setToken(null)
        window.localStorage.removeItem('loggedBlogAppUser')
        dispatch({
            type: 'LOGOUT',
        })
        if(sessionEnd) {
            dispatch(errorNotificationChange('Session has expired', 5))
        } else {
            dispatch(successNotificationChange('Successfully logged out', 5))
        }
    }
}

export const setUser = (user) => {
    return async dispatch => {
        blogService.setToken(user.token)
        commentService.setToken(user.token)
        dispatch({
            type: 'SET_USER',
            user: user,
        })
    }
}

export const createUser = (user) => {
    return async dispatch => {
        try {
            await loginService.create(user)
            dispatch(login(user, true))
        } catch {
            dispatch(errorNotificationChange('There was an error creating your user!', 5))
        }
    }
}
  
export default loginReducer