import React from 'react'

function List({list}) {
    return (
        <div>
            <label>
                Name: {list.firstName} {list.lastName} 
                Phone Number: {list.phone}
            </label>
        </div>
    )
}

export default List
