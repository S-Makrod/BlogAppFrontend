import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { logout } from '../reducers/loginReducer'
import { Form, Row, Col } from 'react-bootstrap'

const BlogForm = () => {
    const dispatch = useDispatch()
    const newTitle = useField('text', 'title')
    const newAuthor = useField('text', 'author')
    const newURL = useField('text', 'url')
    const [validated, setValidated] = useState(false)

    const addBlog = (event) => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation()
            setValidated(true)
            return;
        }
        setValidated(true)
        dispatch(createBlog(newTitle, newURL, newAuthor))
        newTitle.reset()
        newAuthor.reset()
        newURL.reset()
        setValidated(false)
    }

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
            <Row className='mb-3'>
                <h2>Create Blog</h2>
            </Row>
            <div className='container'>
                <Form noValidate validated={validated} onSubmit={addBlog}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                required
                                minLength={3}
                                placeholder='Title'
                                {...newTitle.form}
                            />
                            <Form.Control.Feedback type="invalid">Title must be at least 3 characters!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label>URL</Form.Label>
                            <Form.Control
                                required
                                placeholder='URL'
                                {...newURL.form}
                            />
                            <Form.Control.Feedback type="invalid">URL is required!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                required
                                placeholder='Author'
                                {...newAuthor.form}
                            />
                            <Form.Control.Feedback type="invalid">Author is required!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <button type="submit" className="btn btn-outline-dark mb-3">Create Blog</button>
                </Form>
            </div>
        </div>
    )
}

export default BlogForm
