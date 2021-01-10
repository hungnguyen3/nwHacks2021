import React from 'react'

function Logout({setToken}) {

    function logoutfunction(){
        setToken();
    }

    return (
        <div>
            <button onClick={()=>logoutfunction()}>Log Out</button>
        </div>
    )
}

export default Logout
