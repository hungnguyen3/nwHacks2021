import logo from './logo.svg';
import './App.css';
import Login from './Login.js';
import Managestudents from './ManageStudents';
import AddQuestions from './AddQuestions';
import SendSMS from './SendSMS';

function App() {
  return (
    <div>
      <Login></Login>
      <Managestudents></Managestudents>
      <AddQuestions></AddQuestions>
      <SendSMS></SendSMS>
    </div>
  );
}

export default App;
