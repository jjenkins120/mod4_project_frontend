// import React from 'react'

// class NavBar extends React.Component {
    
//     render(){
//       return (
//         <div>
//             {/* includes app title that links to home page, with notes and profile dropdowns */}
//             {/* notes dropdown includes create a new note, and my notes(maybe my favorite notes too) */}
//             {/* profile dropdown includes edit my profile that links to the SeeEditProfile.js, and sign out which takes the user back to the login page */}
//         </div>
//       );
//     }
//   }
  
//   export default NavBar;

import React, { Component } from 'react'
import { Menu, Segment, Dropdown } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class NavBar extends Component {
  // state = { activeItem: 'home' }

  // handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    // const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item>
            <Link to='/home'>Home</Link>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Dropdown item text='Options'>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link to='/new'>Create New Note</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                <Link to='/edituser'>Edit My Profile</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                <Link to='/'>Logout</Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}