import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import Register from '../functions/Register';

function Login({setToken}) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    var token2 = {
        token: "test",
    }

    async function loginUser(credentials) {
        return fetch('http://localhost:8080/api/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
          .then(data => data.json())
       }

    const handleSubmit = async e => {
    e.preventDefault();
    
    const token = await loginUser({
        username,
        password
    });
    console.log(token);
    setToken(token.sessionId);
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input type="text" onChange={e => setUserName(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
            </form>
            <Register/>
        </div>
    )
}

export default Login
