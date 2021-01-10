import React, { useState } from 'react';
import { Button } from '@material-ui/core';

function Login({ setToken }: any) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    async function loginUser(credentials: any) {
        return fetch('http://localhost:8080/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        }).then(data => data.json());
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const token = await loginUser({
            username,
            password,
        });
        console.log(token);
        setToken(token.sessionId);
    };

    async function registerUser(credentials: any) {
        console.log(credentials);
        console.log('Register');
        return fetch('http://localhost:8080/api/v1/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        }).then(data => data.json());
    }

    const handleRegister = async e => {
        const token = await registerUser({
            username,
            password,
        });
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input
                        type="text"
                        onChange={e => setUserName(e.target.value)}
                    />
                </label>
                <label>
                    <p>Password</p>
                    <input
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <button onClick={() => handleRegister()}>Register</button>
        </div>
    );
}

export default Login;
