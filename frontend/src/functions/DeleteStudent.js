import React from 'react'
import RefreshStudents from '../functions/RefreshStudents.js'

//api/v1/contacts/

function DeleteStudent({sessionId, uId, setStudents}) {
    async function getStudents(info){
        let url =  'http://localhost:8080/api/v1/contacts/' + uId;
        return fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
          })
            .then(data => data.json())
        }

    const handleGetStudents = async e => {
        const data = await getStudents({
            sessionId: sessionId,
        });
        console.log(data);
        }

    return (
        <button onClick={()=>handleGetStudents()}>Delete</button>
    )
}

export default DeleteStudent
