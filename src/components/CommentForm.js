import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createComment } from '../reducers/commentReducer'
import { Form, Row, Col } from 'react-bootstrap'

const CommentForm = ({blog}) => {
    const dispatch = useDispatch()
    const newComment = useField('text', 'comment')
    const [validated, setValidated] = useState(false)

    const addComment = (event) => {
        event.preventDefault()
        const formSubmit = event.currentTarget
        if (formSubmit.checkValidity() === false || newComment.form.value.length < 1) {
            event.stopPropagation()
            setValidated(true)
            return;
        }
        setValidated(true)
        dispatch(createComment(newComment.form.value, blog.id))
        newComment.reset()
        setValidated(false)
    }

    return (
        <div>
            <Form noValidate validated={validated} onSubmit={addComment}>
                    <Row className="mb-3">
                        <Form.Group as={Col} sm="2" md="8" controlId="validationCustom01">
                            <Form.Control
                                required
                                placeholder='Comment'
                                {...newComment.form}
                            />
                            <Form.Control.Feedback type="invalid">Comment cannot be empty!</Form.Control.Feedback>
                        </Form.Group>
                        <button type="submit" className="ms-2 col-sm-2 col-md-2 btn btn-outline-dark mb-3">Add Comment</button>
                    </Row>
                </Form>
        </div>
    )
}

export default CommentForm
