import React from 'react'
import NavBar from './NavBar.js'
import { Form, Grid, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addNote } from '../actions/notes'

class NewNote extends React.Component {
  state = {
    title:'',
    content:'', 
    user_id: this.props.user.id,  
    favorite: false 
  }
  
  handleChange = (e) => {
    this.setState({
    [e.target.name]: e.target.value 
    })
    console.log(this.props.user.id)
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
    fetch('http://localhost:3000/notes', reqObj)
    .then(resp => resp.json())
    .then(newNote => {
      this.props.addNote(newNote)
      this.props.history.push('/home')
      alert('New note added!')
    })
  }

  render(){
      const { value } = this.state
      return (
        <div>
            <NavBar/>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 600, margin: 50 }} >
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group widths='equal'>
                    <Form.Input fluid label='Title' placeholder='Title' name='title' onChange={this.handleChange}/>
                  </Form.Group>
                  <Form.TextArea label='Content' placeholder='Write your note here...' name='content' onChange={this.handleChange}/>
                  <Button.Group>
                    <Form.Button>Submit</Form.Button>
                    <Button.Or />
                    <Link to={`/home`}><Button>Home</Button></Link>
                  </Button.Group>
                </Form>
              </Grid.Column>
            </Grid >
            {/* Form that includes input for title field and content field with a submit button. Submit should submit post request, alert the user of new submission and link to either the new show page or the home page */}
        </div>
      );
    }
  }
  
  const mapStatetoProps = (state) => {
    return { 
      user: state.user
    }
  }
  
  const mapDispatchToProps = {
    addNote
  }

  export default connect(mapStatetoProps, mapDispatchToProps)(NewNote);