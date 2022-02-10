import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteComment } from "../reducers/commentReducer"
import moment from 'moment'
import { Table } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Comments = ({blog}) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleDelete = (id) => {
        if(window.confirm(`Are you sure you want to delete this comment?`)) {
            dispatch(deleteComment(id))
        }
    }

    if(blog.comments.length === 0) {
        return <p>There are no comments yet!</p>
    }

    return (
        <Table striped borderless hover>
            <tbody>
                {blog.comments.map (comment => {
                    const time = moment(new Date(comment.pubdate)).fromNow()
                    return (<tr key={comment.id}>
                        <td className="col-md-5">
                            <div>
                                {comment.user.name} ({time})
                            </div>
                            {comment.comment} 
                        </td>
                        <td className="col-md-2">
                            {user && comment.user.id === user.id? <button className="ms-3 btn btn-outline-danger" onClick={() => handleDelete(comment.id)}>Delete Comment&nbsp;<FontAwesomeIcon icon={faTrashAlt} /></button>:<></>}
                        </td>
                    </tr>)
                })}
            </tbody>
        </Table>
    )
}

export default Comments