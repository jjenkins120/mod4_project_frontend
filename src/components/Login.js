import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUserSuccess } from '../actions/user'

class Login extends React.Component {

  state = {
    username: 'jjenkins120',
    password: 123
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const reqObj = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(this.state)
    }
    fetch('http://localhost:3000/users/sessions/login', reqObj)
    .then(resp => resp.json())
    .then(user => {
      this.props.fetchUserSuccess(user)
      this.props.history.push('/home')
    })
  }

  // handleSubmit = (e) => {
  //   e.preventDefault()
  //   fetch('http://localhost:3000/users')
  //   .then(resp => resp.json())
  //   .then(users => {
  //     const currentUser = users.find(userObj => {
  //       if ((userObj.username === this.state.username) && (userObj.password === this.state.password)){
  //         return userObj
  //       } 
  //     })
  //     if (!currentUser){
  //         alert("Username or Password is not valid!")
  //     }
  //       this.props.fetchUserSuccess(currentUser)
  //       this.props.history.push('/home')
  //   })
  // }
    
    render(){
      return (
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Username</label>
              <input placeholder='Username' value={this.state.username} name='username' onChange={this.handleChange}/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type='password' placeholder='Password' value={this.state.password} name='password' onChange={this.handleChange}/>
            </Form.Field>
            <Button type='submit'>Login</Button>
              {/* <Link to='/home'>Login</Link> */}
          </Form>
          Don't have a profile? Create one <Link to='/newuser'>here</Link>.
            {/* form to login in with username and password, upon submission linked to the home page */}
            {/* STRETCH: link to create a profile */}
            {/* STRETCH: user facebook or google login */}
        </div>
      );
    }
  }
  

  const mapDispatchToProps = {
    fetchUserSuccess
  }

  export default connect(null, mapDispatchToProps)(Login);