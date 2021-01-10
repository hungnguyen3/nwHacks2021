/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

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
    const handleDeleteStudents = (e: React.MouseEvent) => {
        e.preventDefault();
        axios
            .delete(`http://localhost:8080/api/v1/contacts/${uId}`, {
                data: {
                    sessionId,
                },
            })
            .then(resp => console.log(resp))
            .catch(err => console.error(err));
    };

    return (
        <IconButton aria-label="delete" onClick={handleDeleteStudents}>
            <DeleteIcon></DeleteIcon>
        </IconButton>
    );
};

export default DeleteStudent;
