import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer'

const LoginScreen = () => {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [loginState, setLoginState] = useState(0);

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/login', {
                emailId: emailId,
                password: password
            });
            console.log('Response: ', response);
            if (response.status === 200) {
                setLoginState(1);
            } else {
                setLoginState(2);
            }
        } catch (error) {
            console.error('Error: ', error);
            setLoginState(3);
        }
    };

    const handleForgotPassword = () => {
        // TODO: Implement forgot password logic
    };

    return (
        <>
        <Header/>
        <div className="container">
            <h1 className="title">Welcome to GoCineWave</h1>
            {loginState === 2 && <p className="error-message">Invalid Credentials</p>}
            <input
                className="input"
                type="email"
                placeholder="EmailId"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
            />
            <input
                className="input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-button" onClick={handleLogin}>
                Login
            </button>
            <button className="forgot-password-button" onClick={handleForgotPassword}>
                Forgot Password?
            </button>
        </div>
        <Footer/>
        </>
    );
};

export default LoginScreen;
