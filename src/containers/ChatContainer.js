import React, { Component } from 'react';
import Room from '../components/Room'
import { receiveMsg } from '../actions/transmissions'
import { setLanguage } from '../actions/languages'
import { connect } from 'react-redux';

class ChatContainer extends Component{

  componentDidMount(){
    this.props.socket.on('chatMsg-en', (msg)=>{
      this.props.receiveMsg(msg)
    })
  }


  render(){

      const incomingMsgs = this.props.messages.incoming
      const outgoingMsgs = this.props.messages.outgoing

    return(
      <div>
        <h1 style={{fontSize: 60, color: 'white', textAlign: "center"}}>globeChatter</h1>
        <Room incoming={incomingMsgs} outgoing={outgoingMsgs}/>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  console.log(state)
  return{
    messages: state.transmissions.messages,
    socket: state.transmissions.socket
  }
}

export default connect(mapStateToProps, { receiveMsg, setLanguage })(ChatContainer)
