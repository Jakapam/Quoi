import React, { Component } from 'react';
import Room from '../components/Room'
import { receiveMsg, systemMsg, createSocket } from '../actions/transmissions'
import { setLanguage } from '../actions/languages'
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react'
import title from '../fulltitle.png'
import LogoutButton from './LogoutButton'

class ChatContainer extends Component{

  state={
    atBottomNewMessages: false
  }

  componentWillMount(){
    if (!this.props.socket){
      this.props.createSocket()
    }
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

    const imgStyle={
      display: 'block',
      margin: '0 auto'
    }

    if(this.scrollElement && this.scrollElement.scrollTop === this.scrollElement.scrollHeight - this.scrollElement.clientHeight){
      console.log("Bottom")
    }

      const incomingMsgs = this.props.messages.incoming
      const outgoingMsgs = this.props.messages.outgoing
      const systemMsgs = this.props.messages.system

    return(
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)'
        }}
        className="animated fadeIn">
        <LogoutButton/>
        <Image src={title} style={imgStyle} size="medium"/>
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

export default connect(mapStateToProps, { receiveMsg, setLanguage, systemMsg, createSocket })(ChatContainer)
