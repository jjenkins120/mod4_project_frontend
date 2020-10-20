import React from 'react'
import NavBar from "./NavBar.js"

class EditUser extends React.Component {
    
    render(){
      return (
        <div>
            <NavBar/>
            Edit User
            {/* Form (opportunity to replicate real world where you click to edit next to each field)that includes all user fields populated with the current users information, upon submission user is alerted that the profile is updated and they are taken to the home page */}
            {/* field to include deleting the profile that will send a delete request to the BE */}
        </div>
      );
    }
  }
  
  export default EditUser;