import React from 'react'
import NavBar from './NavBar.js'

class NewNote extends React.Component {
    
    render(){
      return (
        <div>
            <NavBar/>
            {/* Form that includes input for title field and content field with a submit button. Submit should submit post request, alert the user of new submission and link to either the new show page or the home page */}
        </div>
      );
    }
  }
  
  export default NewNote;