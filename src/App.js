import React, { Component } from 'react';
import {connect} from 'react-redux';
import openSocket from 'socket.io-client'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

class App extends Component {

  state={
    messageDisplay: "",
    currentLanguage: "en"
  }

  componentWillMount(){
    this.socket = openSocket('http://localhost:3001')
  }

  componentDidMount(){
    console.log("Component Mounted")
    this.socket.on(`chatMsg-${this.state.currentLanguage}`, (msg)=>{
        this.setState({messageDisplay: this.state.messageDisplay + ' ' + msg })
    })
  }

  handleSubmit= (event)=>{
    event.preventDefault();
    console.log("Emitted")
    this.socket.emit('chat message', event.target.children[0].value)
    this.setState({messageDisplay: this.state.messageDisplay + ' ' + event.target.children[0].value})
  }


  handleLanguageSubmit= (event)=>{
    event.preventDefault();
    this.socket.off(`chatMsg-${this.state.currentLanguage}`)
    this.setState({
      currentLanguage: event.target.children[0].value
      },
      ()=>{
        this.socket.on(`chatMsg-${this.state.currentLanguage}`, (msg)=>{
          this.setState({messageDisplay: this.state.messageDisplay + ' ' + msg })
        })
      }
    )
    this.socket.emit('set language', event.target.children[0].value);
  }

  render() {
    return (
      <div className="App">
        <p>{this.state.messageDisplay}</p>
        <form onSubmit={this.handleSubmit}>
          <input type="textarea"></input>
        </form>
        <form onSubmit={this.handleLanguageSubmit}>
          <input type="textarea"></input>
        </form>
      </div>
    );
  }
}


const mapStateToProps = (state)=>{
  console.log(state)
}

const mapDispatchToProps = (dispatch)=>{
  console.log(dispatch)
}

export const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
