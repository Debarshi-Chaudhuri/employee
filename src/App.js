import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Admin from './Admin';
import Employee from './Employee';
import {Route,Switch} from 'react-router-dom';
function App() {
  return (
    <div >
      <Switch>
        <Route exact path='/' component={Login}></Route>
        <Route exact path='/Admin' component={Admin} ></Route>
        <Route exact path='/Employee' component={Employee} ></Route>
      </Switch>
    </div>
  );
}

export default App;
