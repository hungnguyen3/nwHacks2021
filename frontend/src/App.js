import logo from './logo.svg';
import './App.css';
import Login from './Login.js';
import Managestudents from './ManageStudents';
import AddQuestions from './AddQuestions';
import SendSMS from './SendSMS';
import Register from './Register';
import { useState } from 'react';
import Logout from './Logout';

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return (
      <Login setToken={setToken}/>
    )
  }

  return (
    <div>
      {/* <Login></Login> */}
      <Managestudents sessionId={token}/>
      <AddQuestions></AddQuestions>
      <SendSMS></SendSMS>
      <Logout setToken={setToken}/>
    </div>
  );
}

export default App;
