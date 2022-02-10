import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { Link, useHistory } from 'react-router-dom'
import { Row, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const User = () => {
    const history = useHistory()
    const match = useRouteMatch('/users/:id')
    const users = useSelector(state => state.users)
    const user = users.find(user => user.id === match.params.id)

    const view = (blog) => {
        history.push(`/blogs/${blog.id}`)
    }

    if (!user) {
        return null
    }

    return (
        <div>
            <Row className='mb-3'>
                <h2>{user.name}</h2>
            </Row>
            <Row className='mb-3'>
                <h3>User's Blogs</h3>
            </Row>
            {user.blogs.length === 0? <p>This user seems to be a lurker (they have no blogs)</p>:
                <Table striped hover bordered>
                    <thead>
                        <tr><th className="col-md-5">Title</th><th className="col-md-2">Likes</th><th className='col-md-5'>Actions</th></tr>
                    </thead>
                    <tbody>
                        {user.blogs.map(blog => <tr key={blog.id}><td><Link style={{textDecoration: 'none'}} to={`/blogs/${blog.id}`}>{blog.title}</Link></td><td>{blog.likes}</td><td className='btn-col'><button className="btn btn-outline-success" onClick={() => view(blog)}>View Blog&nbsp;<FontAwesomeIcon icon={faEye} /></button></td></tr>)}
                    </tbody>
                </Table>
            }
        </div>
    )
}

export default User