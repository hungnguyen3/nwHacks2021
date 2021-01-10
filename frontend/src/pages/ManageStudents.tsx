/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useState } from 'react';
import StudentsList, { Contact } from '../functions/StudentsList';

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
    const [students, setStudents] = useState<Contact[]>([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');

    const addStudent = (info: StudentInfo): Promise<Contact> => {
        console.log(info);
        return new Promise((resolve, reject) => {
            axios
                .post('http://localhost:8080/api/v1/contacts/add', {
                    ...info,
                })
                .then((response: { data: Contact }) => {
                    resolve(response.data);
                })
                .catch(error => reject(error));
        });
    };

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        addStudent({
            sessionId: sessionId,
            firstName,
            lastName,
            phone,
        })
            .then(student => {
                const newStudents = [...students, student];
                setStudents(newStudents);
            })
            .catch(err => console.error(err));
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
                setStudents={setStudents}
            />

            <h1>Add New Student</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="First Name"
                        type="text"
                        onChange={e => setFirstName(e.target.value)}
                    ></TextField>
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="Last Name"
                        type="text"
                        onChange={e => setLastName(e.target.value)}
                    ></TextField>
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="Phone"
                        type="text"
                        onChange={e => setPhone(e.target.value)}
                    ></TextField>
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
        </div>
    );
};

export default ManageStudents;
