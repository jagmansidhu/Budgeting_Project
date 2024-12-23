import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAPICall } from './AuthService';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLoginForm = async (e) => {
        e.preventDefault();

        try {
            const response = await loginAPICall(email, password);
            console.log(response.data);

            // Save user ID or token to local storage
            localStorage.setItem('userId', response.data.id);

            // Redirect to client details page with client ID
            navigate(`/client-details/${response.data.id}`);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div>
            <br /> <br />
            <div>
                <div>
                    <div>
                        <div>
                            <h2>Login</h2>
                        </div>
                        <div>
                            <form>
                                <div>
                                    <label>Email</label>
                                    <div>
                                        <input
                                            type='text'
                                            name='email'
                                            placeholder='Enter email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label>Password</label>
                                    <div>
                                        <input
                                            type='password'
                                            name='password'
                                            placeholder='Enter password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button onClick={handleLoginForm}>Login</button>
                                </div>
                                <div>
                                    <button type='button' onClick={handleRegisterRedirect}>
                                        Don't have an account? Register here
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
