import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'

const Logout = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = (event) => {
        dispatch(logout())
        history.push('/')
    }

    return <button type='button' className='btn btn-outline-dark' onClick={handleLogout} >Logout&nbsp;<FontAwesomeIcon icon={faSignOut} /></button>
}

export default Logout