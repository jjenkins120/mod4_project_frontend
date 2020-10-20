import React from 'react'
import NavBar from './NavBar.js'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteNote } from '../actions/notes'

class ShowNote extends React.Component {
    


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
            {foundNote.title}<br/>
            {foundNote.content}
            {}
            <br/><Button>
              <Link to={`/editnote/${Id}`}>Edit Note</Link>
            </Button>
            <Button onClick={() => this.handleDelClick(Id)}>Delete Note</Button>
            <Button>
              <Link to={`/home`}>Back</Link>
            </Button>
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

