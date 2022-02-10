import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../reducers/loginReducer'
import { useField } from '../hooks'
import { Redirect, Link } from 'react-router-dom'
import { Form, Row, Col } from 'react-bootstrap'

const UserForm = () => {
    const dispatch = useDispatch()
    const newUsername = useField('text', 'username')
    const newName = useField('text', 'name')
    const newPassword = useField('password', 'password')
    const user = useSelector(state => state.user)
    const [validated, setValidated] = useState(false)

    const handleSignUp = (event) => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation()
            setValidated(true)
            return;
        }
        setValidated(true)
        dispatch(createUser({username: newUsername.form.value, password: newPassword.form.value, name: newName.form.value}))
    }
    
    return (
        <div className='container'>
            {!user? <>
            <Row className='mb-3'>
                <h2>Sign Up</h2>
            </Row>
            <div className='container'>
                <Form noValidate validated={validated} onSubmit={handleSignUp}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                minLength={3}
                                placeholder='Name'
                                {...newName.form}
                            />
                            <Form.Control.Feedback type="invalid">Name must be at least 3 characters!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                required
                                minLength={3}
                                placeholder='Username'
                                {...newUsername.form}
                            />
                            <Form.Control.Feedback type="invalid">Username must be at least 3 characters!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                minLength={6}
                                placeholder='Password'
                                {...newPassword.form}
                            />
                            <Form.Control.Feedback type="invalid">Password must be at least 6 characters!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <button type="submit" className="btn btn-outline-dark mb-3">Register</button>
                </Form>
                <Row>
                    <p><Link to='/login'>Back to login</Link></p>
                </Row>
            </div> 
            </>:<Redirect to="/" />}
        </div>
    )    
}

export default UserForm