import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { useField } from '../hooks'
import { Redirect, Link } from 'react-router-dom'
import { Form, Row, Col } from 'react-bootstrap'

const LoginForm = () => {
    const dispatch = useDispatch()
    const username = useField('text', 'username')
    const password = useField('password', 'password')
    const user = useSelector(state => state.user)
    const [validated, setValidated] = useState(false)

    const handleLogin = (event) => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation()
            setValidated(true)
            return;
        }
        setValidated(true)
        dispatch(login({username: username.form.value, password: password.form.value,}))
    }
    
    return (
        <div>
            {!user? <>
            <Row className='mb-3'>
                <h2>Login</h2>
            </Row>
            <div className='container'>
                <Form noValidate validated={validated} onSubmit={handleLogin}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                required
                                placeholder='Username'
                                {...username.form}
                            />
                            <Form.Control.Feedback type="invalid">Username is required!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                placeholder='Password'
                                {...password.form}
                            />
                            <Form.Control.Feedback type="invalid">Password is required!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <button type="submit" className="btn btn-outline-dark mb-3">Login</button>
                </Form>
                <Row>
                    <p>Don't have an account <Link to='/create/user'>sign up here!</Link></p>
                </Row>
            </div>  
            </>:<Redirect to="/" />}
        </div>
    )    
}

export default LoginForm
