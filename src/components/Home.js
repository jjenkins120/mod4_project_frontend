import React from 'react'
import NavBar from "./NavBar.js"
import NoteContainer from "./NoteSection/NoteContainer.js"
import { connect } from 'react-redux'
import { fetchNotesSuccess } from '../actions/notes'
import user from '../reducers/user.js'


class Home extends React.Component {
    
    // state = {
    //     notes: []
    //   }
  
    componentDidMount(){
        fetch('http://localhost:3000/notes')
        .then(resp => resp.json())
        .then(notes => {
            this.props.fetchNotesSuccess(notes)
        })
    }

    render(){
      return (
        <div>
            <NavBar/>
            <NoteContainer notes={this.props.notes}/>
        </div>
      );
    }
  }
  


  const mapStatetoProps = (state) => {
    return { 
      notes: state.notes,
      user: state.user
    }
  }

  const mapDispatchToProps = {
    fetchNotesSuccess
  }

  export default connect(mapStatetoProps, mapDispatchToProps)(Home);