import React from 'react'

class NavBar extends React.Component {
    
    render(){
      return (
        <div>
            {/* includes app title that links to home page, with notes and profile dropdowns */}
            {/* notes dropdown includes create a new note, and my notes(maybe my favorite notes too) */}
            {/* profile dropdown includes edit my profile that links to the SeeEditProfile.js, and sign out which takes the user back to the login page */}
        </div>
      );
    }
  }
  
  export default NavBar;