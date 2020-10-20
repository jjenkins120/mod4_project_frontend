import React from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class NoteTile extends React.Component {
    

    render(){
      return (
        <div>
            {this.props.note.title}
            <br/>{this.props.note.content}<br/>
            <Button type='submit'>
              <Link to={`/shownote/${this.props.note.id}`}>Explore Note</Link>
            </Button>
            {/* View Link that takes user to show page (will need id) */}
            {/* Edit Link that takes user to the edit page (will need id) */}
          
        </div>
      );
    }
  }
  
  export default NoteTile;