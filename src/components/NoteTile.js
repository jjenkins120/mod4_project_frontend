import React from 'react'
import { Button, Icon, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addLike } from '../actions/notes'


class NoteTile extends React.Component {
    
    handleClick = (id) => {
      const updatedLikes = {
        likes: this.props.note.likes + 1
      }
      const reqObj = {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedLikes)
      }
      console.log(updatedLikes)
      fetch(`http://localhost:3000/notes/${id}`, reqObj)
      .then(resp => resp.json())
      .then(updatedNote => {
        this.props.addLike(updatedNote.id)
      })
    }

    render(){
      return (
        <div>
            {this.props.note.title}
            <br/>{this.props.note.content}<br/>
            <Link to={`/shownote/${this.props.note.id}`}><Button icon color='blue'><Icon name='eye' /></Button></Link>
            <Button as='div' labelPosition='right'>
              <Button icon color='red' onClick={() => this.handleClick(this.props.note.id)}>
                <Icon name='heart' />
              </Button>
              <Label as='a' basic pointing='left'>
                {this.props.note.likes}
              </Label>
            </Button>
            {/* <Button secondary>Add to Favorites</Button> */}
            {/* View Link that takes user to show page (will need id) */}
            {/* Edit Link that takes user to the edit page (will need id) */}
          
        </div>
      );
    }
  }
  

  const mapDispatchToProps = {
    addLike
  }

  export default connect(null, mapDispatchToProps)(NoteTile);
  