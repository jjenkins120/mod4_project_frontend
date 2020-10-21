import React from 'react'
// import { Button, Form } from 'semantic-ui-react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUserSuccess } from '../actions/user'

class Login extends React.Component {

  state = {
    username: '',
    password: ''
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
      if (user.error){
        alert(user.error)
      } else {
      this.props.fetchUserSuccess(user)
      this.props.history.push('/home')
      }
    })
  }

  render(){
    return(
      <div>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='' size='large'/> 
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' name='username' onChange={this.handleChange}/>
                <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={this.handleChange}/>
                <Form.Button color='blue' fluid size='large'> Login </Form.Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to='/newuser'>Sign up</Link>.
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
  }


  // <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
  //   <Grid.Column style={{ maxWidth: 450 }}>
  //     <Header as='h2' color='teal' textAlign='center'>
  //       <Image src='/logo.png' /> Log-in to your account
  //     </Header>
  //     <Form size='large' onSubmit={this.handleSubmit}>
  //       <Segment stacked>
  //         <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' name='username' onChange={this.handleChange}/>
  //         <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={this.handleChange}/>
  //         <Form.Button color='teal' fluid size='large'> Login </Form.Button>
  //       </Segment>
  //     </Form>
  //     <Message>
  //       New to us? <Link to='/newuser'>Sign up</Link>.
  //     </Message>
  //   </Grid.Column>
  // </Grid>

  

  const mapDispatchToProps = {
    fetchUserSuccess
  }

  export default connect(null, mapDispatchToProps)(Login);