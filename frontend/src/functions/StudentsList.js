import React from 'react'
import List from './List.js'

function StudentsList({students}) {
    return (
        students.map(students => {
            return <List key={students._id} list={students}/>
        }) 
    )
}

export default StudentsList
