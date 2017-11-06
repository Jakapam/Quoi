import React, { Component } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client'
import { createSocket } from './actions/transmissions'
import { fetchLanguages } from './actions/languages'
import { setUser } from './actions/users'
import ChatContainer from './containers/ChatContainer'
import { Route, withRouter } from 'react-router-dom'
import SignUp from './containers/SignUp'
import Login from './containers/Login'
import { userIsNotAuthenticated, userIsAuthenticated } from './utils/authentication'

class App extends Component {

  componentWillMount(){
    this.props.createSocket(openSocket('http://localhost:3001'))
  }

  componentDidMount(){
    if(localStorage.getItem('token')){
      this.props.setUser(localStorage.getItem('token'))
    }
    this.props.fetchLanguages()
  }

  render() {

    return (
      <div className="App">
        <Route path='/chat' component={userIsAuthenticated(ChatContainer)} />
        <Route path='/login' component={userIsNotAuthenticated(Login)} />
        <Route path='/signup' component={SignUp} />
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return { users: state.users }
}

export default withRouter(connect(mapStateToProps, { createSocket, fetchLanguages, setUser })(App))
