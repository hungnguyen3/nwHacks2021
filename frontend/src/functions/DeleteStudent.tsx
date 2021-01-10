/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

//api/v1/contacts/

interface Props {
    sessionId: string;
    uId: string;
    handleGetStudents(): void;
}

const DeleteStudent: React.FC<Props> = ({
    sessionId,
    uId,
    handleGetStudents,
}) => {
    async function getStudents(info: { sessionId: string }) {
        const url = `http://localhost:8080/api/v1/contacts/${uId}`;
        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
        }).then(data => data.json());
    }

    const handleDeleteStudents = async () => {
        const data = await getStudents({
            sessionId: sessionId,
        });
        console.log(data);
    };

    return (
        <IconButton
            aria-label="delete"
            onClick={() => {
            return handleDeleteStudents().then(
                setTimeout(() => {
                    handleGetStudents();
                }, 1000)
            );
        }
        }
    >
        <DeleteIcon></DeleteIcon>
    </IconButton>;
};

export default DeleteStudent;
