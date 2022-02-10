import commentService from '../services/comment'
import { successNotificationChange } from './successNotificationReducer'
import { errorNotificationChange } from './errorNotificationReducer'
import { initializeBlogs } from './blogReducer'
import { initializeUsers } from './userReducer'

const commentReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_COMMENT':
        return state.concat(action.data)
    case 'DELETE_COMMENT':
        return state.filter(comment => comment.id !== action.id)
    default:
      return state
  }
}

export const createComment = (comment, blogID) => {
    return async dispatch => {
        try {
            const newComment = await commentService.create({comment, blogID,})
            dispatch({
                type: 'ADD_COMMENT',
                data: newComment,
            })
            dispatch(initializeBlogs())
            dispatch(initializeUsers())
            dispatch(successNotificationChange(`Comment has been successfully added`, 5))
        } catch {
            dispatch(errorNotificationChange('There was a server error', 5))
        }
    }
}

export const deleteComment = (id) => {
    return async dispatch => { 
        try {
            await commentService.remove(id)
            dispatch({
                type: 'DELETE_COMMENT',
                id: id,
            })
            dispatch(initializeBlogs())
            dispatch(initializeUsers())
            dispatch(successNotificationChange(`Comment successfully deleted`, 5))
        } catch {
            dispatch(errorNotificationChange('Error deleting comment', 5))
        }
    }
}

export default commentReducer