/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import './App.css';
import Login from './pages/Login';
import ManageStudents from './pages/ManageStudents';
import AddQuestions from './pages/AddQuestions';
import SendSMS from './pages/SendSMS';
import { useEffect, useState } from 'react';
import Logout from './functions/Logout';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
                    path="/"
                    render={props => {
                        return token ? (
                            <div>
                                <ManageStudents sessionId={token} />
                                <AddQuestions sessionId={token} />
                                <SendSMS sessionId={token} />
                                <Logout setToken={setToken} />
                            </div>
                        ) : (
                            <Login {...props} setToken={setToken} />
                        );
                    }}
                />
            </Switch>
        </Router>
    );
};

export default App;
