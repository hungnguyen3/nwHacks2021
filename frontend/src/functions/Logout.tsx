/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import React from 'react';

interface Props {
    sessionId: string;
    setToken(s: string): void;
}

const handleLogout = (sessionId: string, setToken: (token: string) => void) => {
    axios
        .post('http://localhost:8080/api/v1/logout', {
            sessionId,
        })
        .then(() => setToken(''))
        .catch(() => setToken(''));
};

const Logout: React.FC<Props> = ({ sessionId, setToken }) => {
    return (
        <div>
            <button onClick={() => handleLogout(sessionId, setToken)}>
                Log Out
            </button>
        </div>
    );
};

export default Logout;
