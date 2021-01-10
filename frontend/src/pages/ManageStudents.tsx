/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useState } from 'react';
import StudentsList from '../functions/StudentsList';

import axios from 'axios';

//api/v1/contacts/id
interface Props {
    sessionId: string;
}

interface StudentInfo {
    sessionId?: string;
    firstName: string;
    lastName: string;
    phone: string;
}

const ManageStudents: React.FC<Props> = ({ sessionId }) => {
    const [students, setStudents] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');

    const addStudent = (info: StudentInfo) => {
        return new Promise((resolve, reject) => {
            axios
                .post('/api/v1/contacts/add', {
                    ...info,
                })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => reject(error));
        });
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const token = await addStudent({
            sessionId: sessionId,
            firstName,
            lastName,
            phone,
        });

        console.log(token);
    };

    const handleGetStudents = () => {
        axios
            .post('/api/v1/contacts/get', { sessionId })
            .then(res => setStudents(res.data.students))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        void handleGetStudents();
    }, []);

    return (
        <div>
            <h1>Manage Students</h1>
            <StudentsList
                students={students}
                sessionId={sessionId}
                handleGetStudents={handleGetStudents}
            />

            <h1>Add New Student</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    <p>First Name</p>
                    <input
                        type="text"
                        onChange={e => setFirstName(e.target.value)}
                    />
                </label>
                <label>
                    <p>Last Name</p>
                    <input
                        type="text"
                        onChange={e => setLastName(e.target.value)}
                    />
                </label>
                <label>
                    <p>Phone</p>
                    <input
                        type="text"
                        onChange={e => setPhone(e.target.value)}
                    />
                </label>
                <div>
                    <button
                        type="submit"
                        onClick={() =>
                            setTimeout(() => {
                                void handleGetStudents();
                            }, 1000)
                        }
                    >
                        Add
                    </button>
                </div>
            </form>

            <button onClick={() => handleGetStudents()}>Refresh</button>
        </div>
    );
};

export default ManageStudents;
