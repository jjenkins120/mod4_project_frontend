import React from 'react'
import NavBar from "./NavBar.js"
import { connect } from 'react-redux'
import { updateNote } from '../actions/notes'
import { Form } from 'semantic-ui-react'

class EditNote extends React.Component {
  
  //NEED TO FIGURE OUT HOW TO POPULATE FORM VALUES WITH THE NOTE INFORMATION TO BEGIN WITH - MIGHT BE ABLE TO PULL IT FROM THE PROPS THAT ARE PASSED DOWN
  
  state = {
    title:'',
    content:'', 
    user_id: '',  
    favorite: false 
  }

  // foundNote = () => {
  //   const splitArray = this.props.location.pathname.split("/")
  //   const Id = parseInt(splitArray[splitArray.length - 1])
  //   const foundNote = this.props.notes.find(noteObj => {
  //     if (noteObj.id === Id){
  //       return noteObj
  //     }
  //   })
  // }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e, id) => {
    e.preventDefault()
    const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(this.state)
    }
    fetch(`http://localhost:3000/${id}`, reqObj)
    .then(resp => resp.json())
    .then(updatedNote => {
      this.props.updateNote(updatedNote)
      this.props.history.push('/home')
      alert(`"${updatedNote.title}" updated!`)
    })
  }

  render(){
    const splitArray = this.props.location.pathname.split("/")
    const Id = parseInt(splitArray[splitArray.length - 1])
    const foundNote = this.props.notes.find(noteObj => {
      if (noteObj.id === Id){
        return noteObj
      }
    })
      return (
        <div>
            <NavBar/>
            <Form onSubmit={(e) => this.handleSubmit(e, Id)}>
              <Form.Group widths='equal'>
                <Form.Input fluid label='Title' placeholder='Title' name='title' value={foundNote.title} onChange={this.handleChange}/>
              </Form.Group>
              <Form.TextArea label='Content' placeholder='Write your note here...' name='content' value={foundNote.content} onChange={this.handleChange}/>
              <Form.Button>Update</Form.Button>
            </Form>
            {/* Form with title and content information already populated. Update button at the bottom should send patch request, alert the user that note has been updated and link to either the home page or the show page */}
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
