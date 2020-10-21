import React from 'react'
import NavBar from './NavBar.js'
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteNote } from '../actions/notes'

class ShowNote extends React.Component {
    
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


  handleDelClick = (id) => {
    const reqObj = {
      method: 'DELETE'
    }
    fetch(`http://localhost:3000/notes/${id}`, reqObj)
    .then(resp => resp.json())
    .then(() => {
      this.props.deleteNote(id)
      this.props.history.push('/home')
      alert('Note Deleted!')
    })
  } 

  render(){
      return (
        <div>
            <NavBar/>
            {this.state.title}<br/>
            {this.state.content}
            {}
            <br/>
            <Link to={`/editnote/${this.state.id}`}><Button icon><Icon name='edit outline'/>Edit</Button></Link>
            <Button onClick={() => this.handleDelClick(this.state.id)} icon><Icon name='delete'/>Delete</Button>
            <Link to={`/home`}><Button icon><Icon name='arrow circle left'/>Back</Button></Link>
            {/* Shows the title of the note and the note contents  */}
            {/* Shows the created by date and last date edited */}
            {/* includes link to home page, link to edit page, and option to delete the note */}
            {/* STRETCH: add a heart icon to add to favorites */}
            {/* STRETCH: add a tag */}
            {/* STRETCH: add a send as email option */}
            {/* STRETCH: add a share with user option */}
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
    deleteNote
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ShowNote);

