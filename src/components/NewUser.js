import React from 'react'
import { Link } from 'react-router-dom'

class NewUser extends React.Component {
    
    render(){
      return (
        <div>
            New User form <br/>
            {/* Form that includes all user fields, upon submission user is taken to the home page */}
            Already have an account? <Link to='/'>Go Back</Link>.
        </div>
      );
    }
  }
  
  export default NewUser;