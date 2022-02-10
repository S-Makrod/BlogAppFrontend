import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'

import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Filter from './components/Filter';
import SuccessNotification from './components/SuccessNotif';
import ErrorNotification from './components/ErrorNotif';
import User from './components/User'
import Users from './components/Users'
import Menu from './components/Menu';
import UserForm from './components/UserForm';
import Footer from './components/Footer'

import { logout, setUser } from './reducers/loginReducer';
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

import { Switch, Route, Redirect } from "react-router-dom"
import { Row } from 'react-bootstrap'

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            const time1 = new Date()
            const time2 = new Date(user.timestamp)
            const diff = (time1.getTime() - time2.getTime())/(1000*60*60)
            if(diff >= 1) {
                dispatch(logout(true))
            }
        }
    }, [dispatch])
    
    return (
        <div>
            <Menu />  
            <div id='page-container'>
                <div id='content-wrap'>
                    <div className='container'>
                        <Row className='mb-3 mt-4'>
                            <h1>Blog App</h1>
                            {user? <i>Logged in as {user.name}</i>:<></>}
                        </Row>          
                        <SuccessNotification />
                        <ErrorNotification />
                        <Switch>
                            <Route exact path='/'>
                                <Row className='mb-3 mt-3'>
                                    <Filter />
                                </Row>
                                <Row className='mb-3 mt-3'>
                                    <h2>Blogs</h2>
                                </Row>
                                <div className='container'>
                                    <BlogList />
                                </div>
                            </Route>
                            <Route exact path='/users' >
                                {user? <><Row className='mb-3'><h2>Users</h2></Row><Users /></>:<Redirect to="/login" />}
                            </Route>
                            <Route path='/users/:id'>
                                <User />
                            </Route>
                            <Route path='/blogs/:id'>
                                <Blog />
                            </Route>
                            <Route path='/create/blog'>
                                {user? <BlogForm />:<Redirect to="/login" />}
                            </Route>
                            <Route path='/login'>
                                <LoginForm />
                            </Route>
                            <Route path='/create/user'>
                                <UserForm />
                            </Route>
                        </Switch>
                    </div>
                </div>
                <div id='footer'>
                <Footer />
                </div>
            </div>
        </div>
    )
}

export default App;
