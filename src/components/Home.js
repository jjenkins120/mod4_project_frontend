import React from 'react'
import NavBar from "./NavBar.js"
import NoteContainer from "./NoteContainer.js"
import { connect } from 'react-redux'
import { fetchNotesSuccess } from '../actions/notes'
import { currentUser } from '../actions/user'



class Home extends React.Component {
    
  
    componentDidMount(){
      const token = localStorage.getItem('app_token')

      if (!token){
        this.props.history.push('/')
      } else {
  
        const reqObj = {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }
  
        // fetch('http://localhost:3000/users/current_user', reqObj)
        // .then(resp => resp.json())
        // .then(data => {
        //   console.log(data);
        //     this.props.currentUser(data.user)
        // })
      }
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
      notes: state.notes
    }
  }

  const mapDispatchToProps = {
    fetchNotesSuccess,
    currentUser
  }

  export default connect(mapStatetoProps, mapDispatchToProps)(Home);