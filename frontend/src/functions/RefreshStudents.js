import React from 'react'

function RefreshStudents({sessionId, setStudents}) {
    async function getStudents(){
        return fetch('http://localhost:8080/api/v1/contacts/get', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({sessionId:sessionId})
          })
            .then(data => data.json())
        }

    const handleGetStudents = async e => {
        const data = await getStudents({});
        console.log(data);
        console.log(data.students[0]);
        setStudents(data.students);
        }

    handleGetStudents();
}

export default RefreshStudents
