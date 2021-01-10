import './App.css';
import Login from './pages/Login';
import Managestudents from './pages/ManageStudents';
import AddQuestions from './pages/AddQuestions';
import SendSMS from './pages/SendSMS';
import { useState } from 'react';
import Logout from './functions/Logout';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  const [token, setToken] = useState();

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
