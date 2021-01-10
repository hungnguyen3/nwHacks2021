/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

const Landing: React.FC = props => {
    const [redirect, setRedirect] = useState(false);

    return redirect ? (
        <Redirect to="/login" />
    ) : (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    backgroundColor: 'lightblue',
                    padding: 20,
                    paddingLeft: 100,
                    paddingRight: 100,
                    borderRadius: 20,
                }}
            >
                <div>
                    <p></p>
                    <Button
                        style={{ minWidth: 110 }}
                        variant="contained"
                        onClick={e => setRedirect(true)}
                    >
                        Login
                    </Button>
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                ></div>
            </div>
        </div>
    );
};

export default Landing;
