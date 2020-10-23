import React from 'react'
import NoteTile from "./NoteTile.js"
import { connect } from 'react-redux'
import { Menu, Input, Segment, Grid, Dropdown } from 'semantic-ui-react'


class NoteContainer extends React.Component {
  
  state = { 
    activeItem: 'All Notes',
    searchQuery: '', 
    sortBy: 'Sort' 
  }
  
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
  handleSortClick = (e, { name }) => this.setState({ sortBy: name })
  
  handleSearchChange = e => this.setState({ searchQuery: e.target.value })

  renderNotes = (notesArray) => {
    return notesArray.map(noteObj => {
      return <Segment style={{backgroundColor: '#F0F8FF'}}><NoteTile note={noteObj}/></Segment>
    })
  }

  renderFavorites = (notesArray) => {
    const filteredFavorites = notesArray.filter(noteObj => {
      if(noteObj.favorite === true){
        return noteObj
      }
    })
    return filteredFavorites
  }

  renderMyNotes = (notesArray, userId) => {
    const myNotes = notesArray.filter(noteObj => {
      if(noteObj.user_id === userId){
        return noteObj
      }
    })
    return myNotes
  }
  
  findNotes = (notesArray, Id) => {
    switch(this.state.activeItem){
      case 'All Notes':
        return notesArray
      case 'Favorites':
        return this.renderFavorites(notesArray)
      case 'My Notes':
        return this.renderMyNotes(notesArray, Id)
    }
  }

  //ISSUE WITH NEWEST AND OLDEST NOT SORTING PROPERLY
  tabDisplay = (notesArray, Id) => {
    const Notes = this.findNotes(notesArray, Id)
    if (this.state.sortBy === 'Sort'){
      return this.renderNotes(Notes)
    } else if (this.state.sortBy === 'Newest'){
      const newestNotes = Notes.sort((a, b) => b.updated_at - a.updated_at).reverse()
      console.log(newestNotes)
      return this.renderNotes(newestNotes)
    } else if (this.state.sortBy === 'Oldest'){
      const oldestNotes = Notes.sort((a, b) => b.updated_at - a.updated_at)
      return this.renderNotes(oldestNotes)
    } else if (this.state.sortBy === 'Most Liked'){
      const mostLikedNotes = Notes.sort((a, b) => b.likes - a.likes)
      return this.renderNotes(mostLikedNotes)
    } else if (this.state.sortBy === 'Least Liked'){
      const leastLikedNotes = Notes.sort((a, b) => b.likes - a.likes).reverse()
      return this.renderNotes(leastLikedNotes)
    }
  } 
  
  render() {
    const { activeItem } = this.state
    const searchedNotes = this.props.notes.filter(noteObj => {
      return (noteObj.content.includes(this.state.searchQuery))||(noteObj.title.includes(this.state.searchQuery)) 
    })
    return (
      <div>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 700, margin: 50 }} >
        <Menu attached='top' tabular>
          <Menu.Item
            name='All Notes'
            active={activeItem === 'All Notes'}
            onClick={this.handleItemClick}
            style={{backgroundColor: ''}}
          />
          <Menu.Item
            name='Favorites'
            active={activeItem === 'Favorites'}
            onClick={this.handleItemClick}
            style={{backgroundColor: ''}}
          />
           <Menu.Item
            name='My Notes'
            active={activeItem === 'My Notes'}
            onClick={this.handleItemClick}
            style={{backgroundColor: ''}}
          />
          <Dropdown item text={this.state.sortBy}>
            <Dropdown.Menu>
              <Dropdown.Item name='Newest' onClick={this.handleSortClick}>Newest</Dropdown.Item>
              <Dropdown.Item name='Oldest' onClick={this.handleSortClick}>Oldest</Dropdown.Item>
              <Dropdown.Item name='Most Liked' onClick={this.handleSortClick}>Most Liked</Dropdown.Item>
              <Dropdown.Item name='Least Liked' onClick={this.handleSortClick}>Least Liked</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input
                transparent
                icon={{ name: 'search', link: true }}
                placeholder='Search Title or Content...'
                value={this.state.searchQuery}
                onChange={this.handleSearchChange}
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Segment attached='bottom'>
          {this.tabDisplay(searchedNotes, this.props.user.id)}
        </Segment>
        </Grid.Column>
      </Grid>
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return { 
    user: state.user
  }
}

export default connect(mapStatetoProps, null)(NoteContainer);