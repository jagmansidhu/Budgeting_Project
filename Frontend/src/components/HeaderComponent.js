import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';

const HeaderComponent = ({ isLoggedIn, handleLogout }) => {
    const navigate = useNavigate();

    const handleTransactionsRedirect = () => {
        const clientId = localStorage.getItem('userId');
        navigate(`/transactions/${clientId}`);
    };

    const handleClientDetailsRedirect = () => {
        const clientId = localStorage.getItem('userId');
        navigate(`/client-details/${clientId}`);
    };

    return (
        <div>
            <header>
                <nav >
                    <ul>
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <button onClick={handleTransactionsRedirect}> Summary</button>
                                </li>
                                <li>
                                    <button onClick={handleTransactionsRedirect}>Transactions</button>
                                </li>
                                <li>
                                    <button onClick={handleClientDetailsRedirect}>Client Details</button>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/register">Register</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default HeaderComponent;
