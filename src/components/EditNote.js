import React from 'react'
import NavBar from "./NavBar.js"

class EditNote extends React.Component {
    
    render(){
      return (
        <div>
            <NavBar/>
            {/* Form with title and content information already populated. Update button at the bottom should send patch request, alert the user that note has been updated and link to either the home page or the show page */}
        </div>
      );
    }
  }
  
  export default EditNote;