import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home.js';
import Login from './components/Login.js';
import EditNote from './components/EditNote.js';
import ShowNote from './components/ShowNote.js';
import NewNote from './components/NewNote.js';
import EditUser from './components/EditUser.js';
import NewUser from './components/NewUser.js'
import Error from './components/Error.js';

class App extends React.Component {
  

  render(){
    return (
      <div>
      <Switch>
        <Route exact path={'/'} component={Login} />
        <Route path={'/home'} component={Home} />
        <Route path={'/editnote'} component={EditNote} />
        <Route path={'/shownote'} component={ShowNote} />
        <Route path={'/new'} component={NewNote} />
        <Route path={'/edituser/:id'} component={EditUser} />
        <Route path={'/newuser/:id'} component={NewUser} />
        <Route path={'*'} component={Error} />
      </Switch> 
    </div>
    );
  }
}

export default App;
