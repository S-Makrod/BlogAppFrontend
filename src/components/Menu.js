import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Logout from './Logout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignIn, faCommenting, faUsers, faAdd } from '@fortawesome/free-solid-svg-icons'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'

const Menu = () => {
    const user = useSelector(state => state.user)
    const history = useHistory()
    const location = useLocation()
    const [url, setUrl] = useState(null)

    useEffect(() => {
        setUrl(location.pathname);
    }, [location])

    const login = () => {
        history.push('/login')
    }

    return (
        <Navbar collapseOnSelect bg='light' expand="lg" className='shadow'>
            <div className='container'>
                <LinkContainer to='/'>
                    <Navbar.Brand ><strong>Blog App</strong></Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className='ms-auto'>
                        <LinkContainer className={"me-2 " + (url === "/"? "underline":"hover-underline-animation")} exact to='/'>
                            <Nav.Link>
                                Blogs&nbsp;<FontAwesomeIcon icon={faCommenting}/>
                            </Nav.Link>
                        </LinkContainer>
                        {user? <LinkContainer className={"me-2 " + (url === "/users"? "underline":"hover-underline-animation")} to='/users'>
                            <Nav.Link>
                                Users&nbsp;<FontAwesomeIcon icon={faUsers}/>
                            </Nav.Link>
                        </LinkContainer>:<></>}
                        {user? <LinkContainer className={"me-2 " + (url === "/create/blog"? "underline":"hover-underline-animation")} to='/create/blog'>
                            <Nav.Link>
                                Create Blog&nbsp;<FontAwesomeIcon icon={faAdd}/>
                            </Nav.Link>
                        </LinkContainer>:<></>}
                        {!user? <button type='button' className='btn btn-outline-dark' onClick={()=>login()}>
                            Login&nbsp;<FontAwesomeIcon icon={faSignIn}/>
                        </button>:<Logout />}
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>   
    )
}

export default Menu