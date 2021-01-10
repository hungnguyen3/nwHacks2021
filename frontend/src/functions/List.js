import React from 'react'
import DeleteStudent from './DeleteStudent'

function List({list, sessionId, setStudents}) {
    return (
        <div>
            <label>
                Name: {list.firstName} {list.lastName} 
                Phone Number: {list.phone}
                <DeleteStudent sessionId= {sessionId} uId = {list._id} />
            </label>
        </div>
    )
}

export default List
