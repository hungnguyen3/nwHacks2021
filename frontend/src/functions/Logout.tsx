import React from 'react';

interface Props {
    setToken(e: React.MouseEvent): void;
}

const Logout: React.FC<Props> = ({ setToken }) => {
    return (
        <div>
            <button onClick={setToken}>Log Out</button>
        </div>
    );
};

export default Logout;
