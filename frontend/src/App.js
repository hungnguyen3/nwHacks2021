import logo from './logo.svg';
import './App.css';
import Login from './Login.js';
import Managestudents from './ManageStudents';
import AddQuestions from './AddQuestions';
import SendSMS from './SendSMS';
import Register from './Register';

function App() {
  return (
    <div>
      <Login></Login>
      <Managestudents></Managestudents>
      <AddQuestions></AddQuestions>
      <SendSMS></SendSMS>
      <Register></Register>
    </div>
  );
}

export default App;
