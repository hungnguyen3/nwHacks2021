import React from 'react'
import RefreshStudents from '../functions/RefreshStudents.js'
import handleGetStudents from '../pages/ManageStudents'

//api/v1/contacts/

function DeleteStudent({sessionId, uId, handleGetStudents}) {
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

    const handleDeleteStudents = async e => {
        const data = await getStudents({
            sessionId: sessionId,
        });
        console.log(data);
        }

    return (
            <button onClick={()=>handleDeleteStudents().then(setTimeout(() => {  handleGetStudents(); }, 1000))}>Delete</button>
    )
}

export default DeleteStudent
