import React from 'react'
import DeleteStudent from './DeleteStudent'

function List({list, sessionId, handleGetStudents}) {

    function refresh(){
        this.props.refresh()
    }

    return (
        <div>
            <label>
                Name: {list.firstName} {list.lastName} 
                Phone Number: {list.phone}
                <DeleteStudent sessionId= {sessionId} uId = {list._id} handleGetStudents = {handleGetStudents} />
            </label>
        </div>
    )
}

export default List
