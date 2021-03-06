import React, { Component } from 'react'
import { Menu, Dropdown, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { userLogout } from '../actions/user'
import { noteLogout } from '../actions/notes'

class NavBar extends Component {
  
  handleClick = () => {
    this.props.userLogout()
    this.props.noteLogout()
    localStorage.removeItem('app_token')
  }

  render() {
    return (
      <div style={{backgroundColor: '#F0F8FF'}}>
        <Menu pointing secondary>
    <Link to='/home'><Menu.Item icon> <Icon name='sticky note outline' size='large' style={{ marginRight: 10 }}/>Welcome, {this.props.user.username}</Menu.Item></Link>
          <Menu.Menu position='right'>
            <Dropdown item text='Options'>
              <Dropdown.Menu>
                <Link to='/home'><Dropdown.Item>See Notes</Dropdown.Item></Link>
                <Link to='/new'><Dropdown.Item>Create New Note</Dropdown.Item></Link>
                <Link to={`/edituser/${this.props.user.id}`}><Dropdown.Item>Edit My Profile</Dropdown.Item></Link>
                <Link to='/'><Dropdown.Item onClick={this.handleClick}>Logout</Dropdown.Item></Link>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    notes: state.notes,
    user: state.user
  }
}

const mapDispatchToProps = {
  userLogout,
  noteLogout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);