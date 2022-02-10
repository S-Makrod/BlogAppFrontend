import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'
import { Link, useHistory } from 'react-router-dom'
import { Row, Table, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons'

const Blog = ({blog}) => {
    const [isMobile, setMobile] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.user)

    const handleDeleteBlog = (blog) => {
        if(window.confirm(`Are you sure you want to delete the blog ${blog.title}?`)) {
            const name = blog.title
            const id = blog.id
            dispatch(deleteBlog(id, name))
        }
    }

    const view = (blog) => {
        history.push(`/blogs/${blog.id}`)
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            setMobile(window.innerWidth < 600)
        }, false)
    }, [])

    return (
        <tr>
            <td>
                <OverlayTrigger
                    key={blog.id}
                    placement='top'
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                        Posted by {blog.user.name}
                        </Tooltip>
                    }
                >
                    <Link to={`blogs/${blog.id}`} style={{ textDecoration: 'none' }}>{blog.title}</Link>
                </OverlayTrigger>
            </td>
            <td>{blog.author}</td>
            <td>{blog.likes}</td>
            {user? <td className='btn-col'><button className="btn btn-outline-success" onClick={() => view(blog)}>View Blog&nbsp;<FontAwesomeIcon icon={faEye} /></button> {blog.user.id === user.id? <button className={(isMobile? "":"ms-3 ") + "btn btn-outline-danger"} onClick={() => handleDeleteBlog(blog)}>Delete Blog&nbsp;<FontAwesomeIcon icon={faTrashAlt} /></button>:<></>}</td>:<></>}
        </tr>
    )
}

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    const filter = useSelector(state => state.filter)
    const blogsToShow = blogs.filter(blog => blog.title.toLowerCase().includes(filter.toLowerCase())).sort((first, second) => second.likes - first.likes)

    return (
        <div>
            {blogs.length === 0? <Row className='mb-3'><p>There are no blogs yet!</p></Row>: (
                blogsToShow.length === 0?  <Row className='mb-3'><p>There are no blogs by that filter!</p></Row>:
                <Row className='mb-3'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className={user? "col-md-3":"col-md-5"}>Title</th>
                                <th className={user? "col-md-3":"col-md-5"}>Author</th>
                                <th className="col-md-2">Likes</th>{user? <th className='col-md-4'>Actions</th>:<></>}
                            </tr>
                        </thead>
                        <tbody>
                            {blogsToShow.map(blog => <Blog key={blog.id} blog={blog} />)}
                        </tbody>
                    </Table>
                </Row>   
            )}
        </div>
    )
}

export default BlogList
