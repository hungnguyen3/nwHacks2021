/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useState } from 'react';
import StudentsList from '../functions/StudentsList';

import axios from 'axios';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

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
                .post('http://localhost:8080/api/v1/contacts/add', {
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
            .post('http://localhost:8080/api/v1/contacts/get', { sessionId })
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
                <div>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="First Name"
                        type="text"
                    >
                        <p>First Name</p>
                        <input
                            type="text"
                            onChange={e => setFirstName(e.target.value)}
                        />
                    </TextField>
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="Last Name"
                        type="text"
                    >
                        <p>Last Name</p>
                        <input
                            type="text"
                            onChange={e => setLastName(e.target.value)}
                        />
                    </TextField>
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="Phone"
                        type="text"
                    >
                        <p>Phone</p>
                        <input
                            type="text"
                            onChange={e => setPhone(e.target.value)}
                        />
                    </TextField>
                </div>
                <div>
                    <Button
                        style={{ minWidth: 110 }}
                        variant="contained"
                        type="submit"
                        onClick={() =>
                            setTimeout(() => {
                                void handleGetStudents();
                            }, 1000)
                        }
                    >
                        Add
                    </Button>
                </div>
            </form>

            <Button
                style={{ minWidth: 110 }}
                variant="contained"
                onClick={() => handleGetStudents()}
            >
                Refresh
            </Button>
        </div>
    );
};

export default ManageStudents;
