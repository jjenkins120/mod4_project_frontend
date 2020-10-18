import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    users: []
  }

  componentDidMount(){
    fetch('http://localhost:3000/users')
    .then(resp => resp.json())
    .then(users => {
      debugger
      this.setState({users})
    })
  }

  render(){
    return (
      <div>
        
      </div>
    );
  }
}

export default App;
