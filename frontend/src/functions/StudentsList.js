import React from 'react'
import List from './List.js'

function StudentsList({students, sessionId, handleGetStudents}) {

    function refresh(){
        this.props.handleGetStudents()
    }

    return (
        students.map(students => {
            return <List key={students._id} list={students} sessionId={sessionId} handleGetStudents = {handleGetStudents}/>
        }) 
    )
}

export default StudentsList
