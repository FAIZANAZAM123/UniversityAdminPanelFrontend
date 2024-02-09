import './App.css';
import { useEffect } from 'react';
import {Switch,Route} from 'react-router-dom';
import Login from './Components/login';
import Home from './Components/home';
import Results from './Components/results';
import ManageQuestions from './Components/manageQuestions';
import Myaccount from './Components/myaccount';
import Error from './Components/error';
import Courses from './Components/Courses';
import PrivateRoute from './Components/private';
import HomeEditForm from './Components/HomeEditForm';
import PreviousData from './Components/PreviousData';

function App() {
  useEffect(()=>{
    document.body.style.overflowX="hidden";
  },[])
  return (
    <div className="App">
     <Switch>
      <Route exact path="/" component={Login}/>
      <Route path="/dashboard" component={Home}/>
      <Route path="/edithome" component={Results}/>
      <Route path="/editcourses" component={Courses}/>
      <Route path="/pre" component={PreviousData}/>

      <Route path="/manage-questions" component={ManageQuestions}/>
      <Route path="/my-accounts" component={Myaccount}/>
      <Route path="*" component={Error}/>

      <Route path="/homeedit" component={HomeEditForm}/>

     </Switch>
    </div>
  );
}

export default App;
