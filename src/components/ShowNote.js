import React from 'react'
import NavBar from './NavBar.js'
import { Button, Icon, Segment, Grid, Reveal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteNote } from '../actions/notes'
import { changeFavorite } from '../actions/notes' 

class ShowNote extends React.Component {
    
  state = {
    id:'',
    title:'',
    content:'',
    created:'',
    updated:'',
    likes:'', 
    user_id: '',  
    favorite: ''
  }

  componentDidMount(){
    this.foundNote()
  }

  foundNote = () => {
    const splitArray = this.props.location.pathname.split("/")
    const Id = parseInt(splitArray[splitArray.length - 1])
    const foundNote = this.props.notes.find(noteObj => {
      if (noteObj.id === Id){
        return noteObj
      }
    })
    this.setState({
      id: foundNote.id,
      title: foundNote.title, 
      content: foundNote.content,
      created: foundNote.created_at,
      updated: foundNote.updated_at,
      likes: foundNote.likes,
      favorite: foundNote.favorite,
      user_id: foundNote.user_id 
    })
  }

  isFavorite = () => {
    return this.state.favorite ? "One of your favorites" : "Not one of your favorites"
  }

  handleFavClick = (id) => {
    const updatedNote = {
      favorite: !this.state.favorite
    }
    const reqObj = {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(updatedNote)
    }
    fetch(`http://localhost:3000/notes/${id}`, reqObj)
    .then(resp => resp.json())
    .then((updatedNote) => {
      //THE FOLLOWING NEEDS TO BE RESOLVED
      this.props.changeFavorite(updatedNote.id)
      this.setState({
        favorite: !this.state.favorite
      })
    })
  }

  handleDelClick = (id) => {
    const reqObj = {
      method: 'DELETE'
    }
    fetch(`http://localhost:3000/notes/${id}`, reqObj)
    .then(resp => resp.json())
    .then(() => {
      this.props.deleteNote(id)
      this.props.history.push('/home')
      alert('Note Deleted!')
    })
  } 

  createdAt = () => {
    const createdAtArray = this.state.created.slice(0,-5).split("T")
    const date = createdAtArray[0]
    const time = createdAtArray[1]
    return `${date} at ${time}` 
  }

  showEditBtn = () => {
    console.log(this.props.user)
    console.log(this.props.user.id)
    console.log(this.state.user_id)
    return this.props.user && (this.props.user.id === this.state.user_id) ? <Reveal animated='move down'><Reveal.Content visible><Button style={{ marginLeft: 5, marginRight: 5, width: 100}}><Icon name='edit outline' style={{color:'black'}} /></Button></Reveal.Content><Reveal.Content hidden><Link to={`/editnote/${this.state.id}`}><Button style={{width: 100, color: "black"}}>Edit</Button></Link></Reveal.Content></Reveal> : null
  }


  render(){
      return (
        <div>
            <NavBar/>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 600, margin: 50 }} >
            <Segment.Group style={{ backgroundColor: '#F0F8FF' }}>
            <Segment textAlign='center' style={{ fontSize: "large", backgroundColor: '#F0F8FF' }}><b>{this.state.title}</b></Segment>
            <Segment.Group>
              <Segment textAlign='left'><b>Content: </b>{this.state.content}</Segment>
              <Segment textAlign='left'><b>Created On: </b>{this.createdAt()}</Segment>
              <Segment textAlign='left'><b>Likes: </b>{this.state.likes}</Segment>
              <Segment textAlign='left'><b>Status: </b>{this.isFavorite()}</Segment>
            </Segment.Group>
            <Segment.Group textAlign='center' style={{ backgroundColor: 'white' }}>
              <Button.Group style={{ margin: 30 }} textAlign='center'>
                {this.showEditBtn()}
                <Reveal animated='move down'>
                  <Reveal.Content visible>
                    <Button icon style={{ marginLeft: 5, marginRight: 5, width: 100 }}><Icon name='delete' style={{color:'red'}}/></Button>
                  </Reveal.Content>
                  <Reveal.Content hidden>
                    <Button style={{width: 100, color: "black"}} onClick={() => this.handleDelClick(this.state.id)}>Delete</Button>  
                  </Reveal.Content>
                </Reveal>
                <Reveal animated='move down'>
                  <Reveal.Content visible>
                    <Button icon style={{ marginLeft: 5, marginRight: 5, width: 100 }}><Icon name='arrow circle left' style={{color:'blue'}}/></Button>
                  </Reveal.Content>
                  <Reveal.Content hidden>
                    <Link to={`/home`}><Button style={{width: 100, color: "black"}}>Home</Button></Link>  
                  </Reveal.Content>
                </Reveal>
                <Reveal animated='move down'>
                  <Reveal.Content visible>
                    <Button icon style={{ marginLeft: 5, marginRight: 5, width: 100}} ><Icon name='favorite' style={{color:'yellow'}}/></Button>
                  </Reveal.Content>
                  <Reveal.Content hidden>
                    <Button style={{width: 100, color: "black"}} onClick={() => this.handleFavClick(this.state.id)}>Favorite?</Button> 
                  </Reveal.Content>
                </Reveal>    
              </Button.Group>
            </Segment.Group>
          </Segment.Group>
          </Grid.Column>
          </Grid>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return { 
      notes: state.notes,
      user: state.user
    }
  }
  
  const mapDispatchToProps = {
    deleteNote, 
    changeFavorite
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ShowNote);

