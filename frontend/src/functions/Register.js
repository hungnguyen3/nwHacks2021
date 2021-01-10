import React, {useState} from 'react'

function Register() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    async function loginUser(credentials) {
        console.log(credentials)
        return fetch('http://localhost:8080/api/v1/register', {
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
    }

    return (
        <div>
            <h1>Register</h1>
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
        </div>
    )
}

export default Register
