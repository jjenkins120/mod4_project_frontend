import React from 'react'
import NavBar from "./NavBar.js"
import { connect } from 'react-redux'
import { updateNote } from '../actions/notes'
import { Form, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class EditNote extends React.Component {
  
  //NEED TO FIGURE OUT HOW TO POPULATE FORM VALUES WITH THE NOTE INFORMATION TO BEGIN WITH - MIGHT BE ABLE TO PULL IT FROM THE PROPS THAT ARE PASSED DOWN
  
  state = {
    id:'',
    title:'',
    content:'', 
    user_id: this.props.user.id,  
    favorite: false 
  }

  componentDidMount(){
    this.foundNote()
  }

  foundNote = () => {
    const splitArray = this.props.location.pathname.split("/")
    const Id = parseInt(splitArray[splitArray.length - 1])
    const foundNote = this.props.notes.find(noteObj => {
      if (noteObj.id === Id){
        return noteObj
      }
    })
    this.setState({
      id: foundNote.id,
      title: foundNote.title, 
      content: foundNote.content, 
      favorite: false 
    })
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
    fetch(`http://localhost:3000/notes/${this.state.id}`, reqObj)
    .then(resp => resp.json())
    .then(updatedNote => {
      console.log(updatedNote)
      this.props.updateNote(updatedNote)
      this.props.history.push('/home')
      alert(`Note updated!`)
    })
  }

  render(){
    // this.foundNote()
    // const splitArray = this.props.location.pathname.split("/")
    // const Id = parseInt(splitArray[splitArray.length - 1])
    // const foundNote = this.props.notes.find(noteObj => {
    //   if (noteObj.id === Id){
    //     return noteObj
    //   }
    // })
      return (
        <div>
            <NavBar/>
            
            <Form onSubmit={this.handleSubmit}>
              <Form.Group widths='equal'>
                <Form.Input fluid label='Title' placeholder='Title' name='title' value={this.state.title} onChange={this.handleChange}/>
              </Form.Group>
              <Form.TextArea label='Content' placeholder='Write your note here...' name='content' value={this.state.content} onChange={this.handleChange}/>
              <Button.Group>
                <Form.Button primary>Update</Form.Button>
              <Button.Or />
                <Link to={`/shownote/${this.state.id}`}><Button secondary>Back</Button></Link>
              </Button.Group>
            </Form>
        </div>
      );
    }
  }
  
  const mapStateToProps = (state) => {
    return { 
      notes: state.notes,
      user: state.user
    }
  }
  
  const mapDispatchToProps = {
    updateNote
  }

  export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
