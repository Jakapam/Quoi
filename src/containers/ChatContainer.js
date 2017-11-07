import React, { Component } from 'react';
import Room from '../components/Room'
import { receiveMsg, systemMsg } from '../actions/transmissions'
import { setLanguage } from '../actions/languages'
import { connect } from 'react-redux';
import LogoutButton from './LogoutButton'

class ChatContainer extends Component{

  state={
    atBottomNewMessages: false
  }

  componentDidMount(){
    this.props.socket.on('chatMsg-en', (msg)=>{
      this.props.receiveMsg(msg)
    })
    this.props.socket.on('system', (msg)=>{
      this.props.systemMsg(msg)
    })
  }

  componentWillReceiveProps(){
    if(this.scrollElement.scrollTop === this.scrollElement.scrollHeight - this.scrollElement.clientHeight){
      this.setState({
        atBottomNewMessages: true
      })
    } else {
      this.setState({
        atBottomNewMessages: false
      })
    }
  }


  componentDidUpdate(){
    if (this.scrollElement && this.state.atBottomNewMessages){
      this.scrollElement.scrollTop = this.scrollElement.scrollHeight - this.scrollElement.clientHeight
    }
  }

  render(){

    if(this.scrollElement && this.scrollElement.scrollTop === this.scrollElement.scrollHeight - this.scrollElement.clientHeight){
      console.log("Bottom")
    }

      const incomingMsgs = this.props.messages.incoming
      const outgoingMsgs = this.props.messages.outgoing
      const systemMsgs = this.props.messages.system

    return(
      <div>
        <LogoutButton/>
        <h1 style={{fontSize: 60, color: 'white', textAlign: "center"}}>globeChatter</h1>
        <Room
          scrollRef = {el => this.scrollElement = el}
          incoming={incomingMsgs}
          outgoing={outgoingMsgs}
          system={systemMsgs}
        />
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return{
    messages: state.transmissions.messages,
    socket: state.transmissions.socket
  }
}

export default connect(mapStateToProps, { receiveMsg, setLanguage, systemMsg })(ChatContainer)
