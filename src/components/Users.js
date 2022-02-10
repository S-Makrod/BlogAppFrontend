import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'
import { Table } from 'react-bootstrap'

const Users = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
        const time1 = new Date()
        const time2 = new Date(user.timestamp)
        const diff = (time1.getTime() - time2.getTime())/(1000*60*60)
        if(diff >= 1) {
            dispatch(logout(true))
        }
    }, [dispatch])

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr><th className='col-md-3'>User</th><th className='col-md-3'>Blogs Created</th><th className='col-md-3'>Comments Posted</th></tr>
                </thead>    
                <tbody>
                    {users.map(user => <tr key={user.id}><td><Link style={{textDecoration: 'none'}} to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td><td>{user.comments.length}</td></tr>)}
                </tbody>
            </Table>
        </div>
    )
}

export default Users