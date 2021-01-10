/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';

function Logout({ setToken }: any) {
    return (
        <div>
            <button onClick={setToken}>Log Out</button>
        </div>
    );
}

export default Logout;
