import React from 'react'
import NoteTile from "./NoteTile.js"
import NoteFilter from "./NoteFilter.js"
import { connect } from 'react-redux'
import { Menu, Input, Button, Segment, Grid, Pagination, Dropdown } from 'semantic-ui-react'


class NoteContainer extends React.Component {
    
  state = { 
    activeItem: 'All Notes',
    searchQuery: '', 
    sortBy: 'Sort' 
  }

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
    return this.renderNotes(filteredFavorites)
  }

  renderMyNotes = (notesArray, userId) => {
    const myNotes = notesArray.filter(noteObj => {
      if(noteObj.user_id === userId){
        return noteObj
      }
    })
    return this.renderNotes(myNotes)
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleSearchChange = (e) => {
    this.setState({
      searchQuery: e.target.value
    })
  }

  tabDisplay = (notesArray) => {
    if (this.state.activeItem === 'All Notes'){
      const allNotes = this.renderNotes(notesArray)
      if (this.state.sortBy === 'Sort'){
        return allNotes
      } else if (this.state.sortBy === 'Newest'){
        const newestAllNotes = allNotes.sort((a, b) => b.created_at - a.created_at).reverse()
        return newestAllNotes
      } else if (this.state.sortBy === 'Oldest'){
        const oldestAllNotes = allNotes.sort((a, b) => b.created_at - a.created_at)
        return oldestAllNotes
      } else if (this.state.sortBy === 'Most Liked'){
        const mostLikedAllNotes = allNotes.sort((a, b) => b.likes - a.likes)
        return mostLikedAllNotes
      } else if (this.state.sortBy === 'Least Liked'){
        return allNotes
      }
    } else if (this.state.activeItem === 'Favorites'){
      const favNotes = this.renderFavorites(notesArray)
      if (this.state.sortBy === 'Sort'){
        return favNotes
      } else if (this.state.sortBy === 'Newest'){
        const newestFavNotes = favNotes.sort((a, b) => b.created_at - a.created_at).reverse()
        return newestFavNotes
      } else if (this.state.sortBy === 'Oldest'){
        const oldestFavNotes = favNotes.sort((a, b) => b.created_at - a.created_at)
        return oldestFavNotes
      } else if (this.state.sortBy === 'Most Liked'){
        return favNotes
      } else if (this.state.sortBy === 'Least Liked'){
        return favNotes
      }
    } else if (this.state.activeItem === 'My Notes'){
      const myNotes = this.renderMyNotes(notesArray, this.props.user.id)
      if (this.state.sortBy === 'Sort'){
        return myNotes
      } else if (this.state.sortBy === 'Newest'){
        const newestMyNotes = myNotes.sort((a, b) => b.created_at - a.created_at).reverse()
        return newestMyNotes
      } else if (this.state.sortBy === 'Oldest'){
        const oldestMyNotes = myNotes.sort((a, b) => b.created_at - a.created_at)
        return oldestMyNotes
      } else if (this.state.sortBy === 'Most Liked'){
        return myNotes
      } else if (this.state.sortBy === 'Least Liked'){
        return myNotes
      }
    }
  }

  containerColor = () => {
    if (this.state.activeItem === 'All Notes'){
      return {backgroundColor: ''}
    } else if (this.state.activeItem === 'Favorites'){
      return {backgroundColor: ''}
    } else if (this.state.activeItem === 'My Notes'){
      return {backgroundColor: ''}
    }
  }
  
  handleSortClick = (e, { name }) => {
    this.setState({
      sortBy: name
    })
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

        <Segment attached='bottom' style={this.containerColor()}>
          {this.tabDisplay(searchedNotes)}
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