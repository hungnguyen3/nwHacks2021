import './App.css';
import Login from './pages/Login';
import Managestudents from './pages/ManageStudents';
import AddQuestions from './pages/AddQuestions';
import SendSMS from './pages/SendSMS';
import { useEffect, useState } from 'react';
import Logout from './functions/Logout';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  const [token, setToken] = useState(() => {
    const savedToken = window.localStorage.getItem('token');
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
        <Route path="/" render={(props) => {
          return token ?
            <div>
              <Managestudents sessionId={token} />
              <AddQuestions sessionId={token} />
              <SendSMS></SendSMS>
              <Logout setToken={setToken} />
            </div> :
            <Login {...props} setToken={setToken} />
        }} />
      </Switch>
    </Router>
  )
}

export default App;
