import React, { useState } from 'react';

import axios, { AxiosResponse } from 'axios';
interface Props {
    setToken(token: string): void;
}

const Login: React.FC<Props> = ({ setToken }) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios
            .post('api/v1/login', {
                username,
                password,
            })
            .then((response: AxiosResponse<{ sessionId: string }>) => {
                setToken(response.data.sessionId);
            })
            .catch(err => console.log(err));
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        axios
            .post('/api/v1/register', {
                username,
                password,
            })
            .then(() => console.log('Registration successful'))
            .catch(err => console.error(err));
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
            <button onClick={e => handleRegister(e)}>Register</button>
        </div>
    );
};

export default Login;
