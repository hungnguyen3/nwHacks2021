/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import './App.css';
import Login from './pages/Login';
import ManageStudents from './pages/ManageStudents';
import AddQuestions from './pages/AddQuestions';
import SendSMS from './pages/SendSMS';
import { useEffect, useState } from 'react';
import Logout from './functions/Logout';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

const App: React.FC = () => {
    const [token, setToken] = useState(() => {
        const savedToken = window.localStorage.getItem('token');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return savedToken != null ? JSON.parse(savedToken) : null;
    });

    useEffect(() => {
        if (token == null) {
            window.localStorage.removeItem('token');
        } else {
            window.localStorage.setItem('token', JSON.stringify(token));
        }
    }, [token]);

    return (
        <Router>
            <Switch>
                <Route
                    path="/login"
                    render={props => {
                        return token ? (
                            <Redirect to="/" />
                        ) : (
                            <Login {...props} setToken={setToken} />
                        );
                    }}
                />
                <Route
                    path="/"
                    render={() => {
                        return token ? (
                            <div
                                className="background"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <div>
                                    <ManageStudents sessionId={token} />
                                </div>
                                <AddQuestions sessionId={token} />
                                <SendSMS sessionId={token} />
                                <Logout sessionId={token} setToken={setToken} />
                            </div>
                        ) : (
                            <Redirect to="/login" />
                        );
                    }}
                />
            </Switch>
        </Router>
    );
};

export default App;
