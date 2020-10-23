import React from 'react'
import { Form, Button, Grid } from 'semantic-ui-react' 
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { newUser, fetchUserSuccess } from '../actions/user'


class NewUser extends React.Component {
    
    state = {
        username: '',
        password: '',
        first_name: '',
        last_name: ''
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
            'Content-Type':'application/json'
          },
          body: JSON.stringify(this.state)
        }
        fetch(`http://localhost:3000/users`, reqObj)
        .then(resp => resp.json())
        .then(newUser => {
          this.props.newUser(newUser)
          this.getToken(this.state)  
        })   
    }

    getToken = (userInfo) => {
        const otherReqObj = {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(userInfo)
        }
        fetch('http://localhost:3000/users/sessions/login', otherReqObj)
        .then(resp => resp.json())
        .then(user => {
            localStorage.setItem('app_token', user.token)  
            this.props.fetchUserSuccess(user)
            this.props.history.push('/home')
            alert(`Thanks for signing up!`)
        })
    }

    render(){
      return (
        <div>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 600, margin: 50 }} >
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Username' name='username' value={this.state.username} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input label='Password' name='password' type='password' value={this.state.password} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input label='First Name' name='first_name' value={this.state.first_name} onChange={this.handleChange}/>
                        <Form.Input label='Last Name' name='last_name' value={this.state.last_name} onChange={this.handleChange}/>
                    </Form.Group>    
                    <Button.Group>
                        <Form.Button>Submit</Form.Button>
                            <Button.Or />
                        <Link to={`/`}><Button>Back</Button></Link>
                        </Button.Group>
                    </Form>
                </Grid.Column>
            </Grid>     
        </div>
      );
    }
}
  
  const mapStateToProps = (state) => {
    return { 
      user: state.user
    }
  }
  
  const mapDispatchToProps = {
    newUser, 
    fetchUserSuccess
  }

  export default connect(mapStateToProps, mapDispatchToProps)(NewUser);