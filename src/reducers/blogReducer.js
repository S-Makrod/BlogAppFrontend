import blogService from '../services/blog'
import { successNotificationChange } from './successNotificationReducer'
import { errorNotificationChange } from './errorNotificationReducer'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_BLOG':
        return state.concat(action.data)
    case 'INIT_BLOGS':
        return action.data
    case 'DELETE_BLOG':
        return state.filter(blog => blog.id !== action.id)
    case 'LIKE_BLOG':
        return state.map(blog => blog.id === action.data.id? action.data:blog)
    default:
      return state
  }
}

export const createBlog = (newTitle, newURL, newAuthor) => {
    const blog = { title: newTitle.form.value, author: newAuthor.form.value, url: newURL.form.value, likes: 0 }
    return async dispatch => {
        try {
            const newBlog = await blogService.create(blog)
            dispatch({
                type: 'NEW_BLOG',
                data: newBlog,
            })
            dispatch(successNotificationChange(`The blog ${newBlog.title} has been successfully added. Navigate to Blogs to see it`, 5))
        } catch {
            dispatch(errorNotificationChange('There was an error with the server', 5))
        }
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        try {
            const blogs = await blogService.getAll()
            dispatch({
                type: 'INIT_BLOGS',
                data: blogs,
            })
        } catch {
            dispatch(errorNotificationChange('Server error', 10))
        }
    }
}

export const deleteBlog = (id, name) => {
    return async dispatch => { 
        try {
            await blogService.remove(id)
            dispatch({
                type: 'DELETE_BLOG',
                id: id,
            })
            dispatch(successNotificationChange(`Blog ${name} successfully deleted`, 5))
        } catch {
            dispatch(errorNotificationChange(`Blog ${name} cannot be deleted`, 5))
        }
    }
}

export const likeBlog = id => {
    return async dispatch => { 
        try {
            const likedBlog = await blogService.update(id)
            dispatch({
                type: 'LIKE_BLOG',
                data: likedBlog,
            })
        } catch {
            dispatch(errorNotificationChange('Error liking blog', 5))
        }
    }
}

export default blogReducer