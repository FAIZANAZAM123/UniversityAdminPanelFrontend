import './App.css';
import { useEffect } from 'react';
import {Switch,Route} from 'react-router-dom';
import Login from './Components/login';
import Home from './Components/home';
import Addlocation from './Components/addlocation';
import ViewLocations from './Components/viewlocations';

function App() {
  useEffect(()=>{
    document.body.style.overflowX="hidden";
  },[])
  return (
    <div className="App">
     <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/dashboard" component={Home}/>
      <Route exact path="/add-location" component={Addlocation}/>
      <Route exact path="/view-locations" component={ViewLocations}/>
     </Switch>
    </div>
  );
}

export default App;
