import React from 'react'
import NavBar from "./NavBar.js"
import { Form, Button, Grid } from 'semantic-ui-react' 
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUser } from '../actions/user'


class EditUser extends React.Component {
    
    state = {
        id: this.props.user.id,
        username: this.props.user.username,
        password: '',
        first_name: this.props.user.first_name,
        last_name: this.props.user.last_name
      }
    
      handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }
    
      handleSubmit = (e) => {
        e.preventDefault()
        const reqObj = {
          method: 'PATCH',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(this.state)
        }
        console.log(this.state.id)
        console.log(this.state)
        fetch(`http://localhost:3000/users/${this.state.id}`, reqObj)
        .then(resp => resp.json())
        .then(updatedUser => {
          this.props.updateUser(updatedUser)
          this.props.history.push('/home')
          alert(`Your profile has been updated!`)
        })
      }

    render(){
      return (
        <div>
            <NavBar/>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 600, margin: 50 }} >
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='Username' name='username' value={this.state.username} onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group widths='equal'>   
                            <Form.Input label='Password' placeholder='Enter New Password' name='password' value={this.state.password} onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group widths='equal'>    
                            <Form.Input label='First Name' name='first_name' value={this.state.first_name} onChange={this.handleChange}/>  
                            <Form.Input label='Last Name' name='last_name' value={this.state.last_name} onChange={this.handleChange}/>
                        </Form.Group>
                        <Button.Group style={{ margin: 20 }}>
                            <Form.Button primary>Update</Form.Button>
                        <Button.Or />
                            <Link to={`/home`}><Button>Home</Button></Link>
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
    updateUser
  }

  export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
