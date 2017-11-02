import React, { Component } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client'
// import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { createSocket } from './actions/transmissions'
import { fetchLanguages } from './actions/languages'
import ChatContainer from './containers/ChatContainer'

class App extends Component {

  componentWillMount(){
    this.props.createSocket(openSocket('http://localhost:3001'))
  }

  componentDidMount(){
    this.props.fetchLanguages()
  }

  render() {
    return (
      <div className="App">
        <ChatContainer />
      </div>
    );
  }
}


export const ConnectedApp = connect( null, { createSocket, fetchLanguages })(App)
