import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import './Header.css'

const HeaderComponent = () => {
    const navigate = useNavigate();

    return (
        <div>
            <header>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <ul className='navbar-nav'>
                        <li>
                            <a href='http://localhost:3000' className='navbar-brand'>
                                Home Page
                            </a>
                        </li>
                        <li className='nav-item'>
                            <NavLink to="/register" className="nav-link">Register</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to="/login" className="nav-link">Login</NavLink>
                        </li>


                    </ul>
                </nav>
            </header>

        </div>
    )
}

export default HeaderComponent