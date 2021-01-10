import React, { useEffect, useState } from 'react'
import List from '../functions/List'
import StudentsList from '../functions/StudentsList'

//api/v1/contacts/id

function Managestudents({ sessionId }: any) {
    const [students, setStudents] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')

    async function addStudent(credentials: any) {
        console.log(credentials)
        return fetch('http://localhost:8080/api/v1/contacts/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(data => data.json())
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await addStudent({
            sessionId: sessionId,
            firstName,
            lastName,
            phone,
        });

        console.log(token);
    }

    async function getStudents() {
        return fetch('http://localhost:8080/api/v1/contacts/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sessionId: sessionId })
        })
            .then(data => data.json())
    }

    const handleGetStudents = async () => {
        const data = await getStudents({});
        console.log(data);
        console.log(data.students[0]);
        setStudents(data.students);
    }

    useEffect(() => {
        handleGetStudents();
    });


    return (
        <div>
            <h1>Manage Students</h1>
            <StudentsList students={students} sessionId={sessionId} handleGetStudents={handleGetStudents} />

            <h1>Add New Student</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    <p>First Name</p>
                    <input type="text" onChange={e => setFirstName(e.target.value)} />
                </label>
                <label>
                    <p>Last Name</p>
                    <input type="text" onChange={e => setLastName(e.target.value)} />
                </label>
                <label>
                    <p>Phone</p>
                    <input type="text" onChange={e => setPhone(e.target.value)} />
                </label>
                <div>
                    <button type="submit" onClick={() => setTimeout(() => { handleGetStudents(); }, 1000)}>Add</button>
                </div>
            </form>

            <button onClick={() => handleGetStudents()}>Refresh</button>
        </div>

    )
}

export default Managestudents
