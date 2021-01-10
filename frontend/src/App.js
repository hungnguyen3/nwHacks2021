import logo from './logo.svg';
import './App.css';
import Login from './pages/Login.js';
import Managestudents from './pages/ManageStudents';
import AddQuestions from './pages/AddQuestions';
import SendSMS from './pages/SendSMS';
import { useState } from 'react';
import Logout from './functions/Logout';

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
