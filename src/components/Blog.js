import React from 'react'
import CommentForm from './CommentForm'
import Comments from './Comments'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { likeBlog } from '../reducers/blogReducer'
import { Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const Blog = () => {
    const dispatch = useDispatch()
    const match = useRouteMatch('/blogs/:id')
    const user = useSelector(state => state.user)
    const blogs = useSelector(state => state.blogs)
    const blog = blogs.find(blog => blog.id === match.params.id)

    const like = (id) => {
        dispatch(likeBlog(id))
    }

    if (!blog) {
        return null
    }

    return (
        <div>
            <Row className='mb-3'>
                <h2 style={{display: 'inline-block'}} className='col-sm-2 col-md-3'>{blog.title}</h2> {user? <p style={{display: 'inline-block'}} className='col-sm-1 col-md-3' ><button  className="btn btn-outline-danger" onClick={() => like(blog.id)}>Like&nbsp;<FontAwesomeIcon icon={faHeart} /></button></p>:<></>}
            </Row>
            <p>Poster: {blog.user.name} | Author: {blog.author} </p>
            <p>Likes: {blog.likes} </p>
            <p>To view the blog please visit: <a href={blog.url}>{blog.url}</a></p>
            
            <Row className='mb-3'>
                <h3>Comments</h3>
            </Row>
            {user? <CommentForm blog={blog}/>:<></>}
            <Comments blog={blog} />
        </div>
    )
}

export default Blog