import React from 'react'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
import { Form, Row, Col } from 'react-bootstrap'

const Filter = () => {
    const dispatch = useDispatch()

    const handleFilterChange = (event) => {
        dispatch(filterChange(event.target.value))
    }

    return (
        <Row className="mb-3 mt-2">
            <Form.Group as={Col} md="6">
                <Form.Control
                    placeholder='Filter Blogs By Title'
                    onChange={handleFilterChange}
                />
            </Form.Group>
        </Row>
    )
}
//<div>Filter By Title: <input onChange={handleFilterChange} /></div>
export default Filter