import React from 'react'
import List from './List'

function StudentsList({students, sessionId, setStudents}) {
    return (
        students.map(students => {
            return <List key={students._id} list={students} sessionId={sessionId} setStudents={setStudents}/>
        }) 
    )
}

export default StudentsList
