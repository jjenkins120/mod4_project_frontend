import React from 'react'
import NoteTile from "./NoteTile.js"
import NoteFilter from "./NoteFilter.js"
import { connect } from 'react-redux'
import { Menu, Input, Button, Segment, Grid } from 'semantic-ui-react'


class NoteContainer extends React.Component {
    
  state = { 
    activeItem: 'All Notes',
    searchQuery: '' 
  }

  renderNotes = (notesArray) => {
    return notesArray.map(noteObj => {
      return <Segment><NoteTile note={noteObj}/></Segment>
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
      return this.renderNotes(notesArray)
    } else if (this.state.activeItem === 'Favorites'){
      return this.renderFavorites(notesArray)
    } else if (this.state.activeItem === 'My Notes'){
      return this.renderMyNotes(notesArray, this.props.user.id)
    }
  }

  render() {
    const { activeItem } = this.state
    const searchedNotes = this.props.notes.filter(noteObj => {
      return (noteObj.content.includes(this.state.searchQuery))||(noteObj.title.includes(this.state.searchQuery)) 
    })

    return (
      <div>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 600, margin: 50 }} >
        <Menu attached='top' tabular>
          <Menu.Item
            name='All Notes'
            active={activeItem === 'All Notes'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Favorites'
            active={activeItem === 'Favorites'}
            onClick={this.handleItemClick}
          />
           <Menu.Item
            name='My Notes'
            active={activeItem === 'My Notes'}
            onClick={this.handleItemClick}
          />
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
          <Segment.Group>
             {/* <NoteFilter/> */}
             {/* NoteTiles go here */}
             {/* Add pagenation functionality for button below */}
               <Segment.Group>
                 {this.tabDisplay(searchedNotes)}
                 {/* {this.state.activeItem === "All Notes" ? this.renderNotes(searchedNotes) : this.renderFavorites(searchedNotes)} */}
               </Segment.Group>
             <Button style={{ margin: 20 }} color='blue'>See more notes</Button>
             {/* STRETCH: Add a functionality to filter by favorites, dated created, edited, and tags */}
           </Segment.Group>
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