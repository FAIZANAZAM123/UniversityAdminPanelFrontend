import './App.css';
import { useEffect } from 'react';
import {Switch,Route} from 'react-router-dom';
import Login from './Components/login';
import Home from './Components/home';
import Addlocation from './Components/addlocation';
import ViewLocations from './Components/viewlocations';
import Stock from './Components/stock';
import Addusers from './Components/addusers';
import Manageusers from './Components/manageusers';
import Myaccount from './Components/myaccount';
import Userhome from './Components/userhome';
import AddStock from './Components/addstock';
import PrivateRoute from './Components/private';
import PrivateUser from './Components/privateuser';

function App() {
  useEffect(()=>{
    document.body.style.overflowX="hidden";
  },[])
  return (
    <div className="App">
     <Switch>
      <Route exact path="/" component={Login}/>
      <PrivateUser exact path="/location" component={Userhome}/>
      <PrivateUser  path="/add-inventory" component={AddStock}/>
      <PrivateRoute path="/dashboard" component={Home}/>
      <PrivateRoute path="/add-location" component={Addlocation}/>
      <PrivateRoute path="/view-locations" component={ViewLocations}/>
      <PrivateRoute path="/view-stock" component={Stock}/>
      <PrivateRoute path="/add-users" component={Addusers}/>
      <PrivateRoute path="/manage-users" component={Manageusers}/>
      <PrivateRoute path="/my-accounts" component={Myaccount}/>
     </Switch>
    </div>
  );
}

export default App;
