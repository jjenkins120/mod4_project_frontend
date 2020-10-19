import React from 'react'


class NoteTile extends React.Component {
    

    render(){
      return (
        <div>
            {/* Display Note Title */}
            <p>{this.props.note.title}</p>
            {/* Display Note content */}
            <p>{this.props.note.content}</p>
            {/* View Link that takes user to show page (will need id) */}
            {/* Edit Link that takes user to the edit page (will need id) */}
        </div>
      );
    }
  }
  
  export default NoteTile;