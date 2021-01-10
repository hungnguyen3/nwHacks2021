/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';

//api/v1/contacts/

function DeleteStudent({ sessionId, uId }: any) {
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

    const handleGetStudents = async () => {
        const data = await getStudents({
            sessionId: sessionId,
        });
        console.log(data);
    };

    return (
        <button
        // onClick={() =>
        //     handleDeleteStudents().then(
        //         setTimeout(() => {
        //             handleGetStudents();
        //         }, 1000)
        //     )
        // }
        >
            Delete
        </button>
    );
}

export default DeleteStudent;
