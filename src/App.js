import React from 'react';
import './App.css';
// import { Route, Switch } from 'react-router-dom'
import Home from './components/Home.js';

class App extends React.Component {
  

  render(){
    return (
      <div >
        <Home/>
      {/* <Switch>

        <Route exact path={'/'} component={Login} />
        <Route path={'/'} component={} />
        <Route path={'/'} component={} />
        <Route path={'/'} component={} />
        <Route path={'*'} component={} />

      </Switch>  */}
    </div>
    );
  }
}

export default App;
