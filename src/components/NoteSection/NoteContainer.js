import React from 'react'
import NoteTile from "./NoteTile.js"
import NoteFilter from "./NoteFilter.js"


class NoteContainer extends React.Component {
    
  renderNotes = () => {
    return this.props.notes.map(noteObj => {
      return <NoteTile note={noteObj}/>
    })
  }

  render(){
    return (
      <div>
          <NoteFilter/>
          {/* NoteTiles go here */}
          {/* Add pagenation functionality for button below */}
          {this.renderNotes()}
          <button>See more notes</button>
          {/* STRETCH: Add a functionality to filter by favorites, dated created, edited, and tags */}
      </div>
    );
  }
}
  
  export default NoteContainer;