import React, { Component } from 'react';
import MessageInput from './MessageInput'
import LanguageSelector from './LanguageSelector'
import ChatDisplay from '../components/ChatDisplay'
import { receiveMsg } from '../actions/transmissions'
import { setLanguage } from '../actions/languages'
import { connect } from 'react-redux';


class ChatContainer extends Component{

  componentDidMount(){
    this.props.socket.on(`chatMsg-${this.props.currentLanguage}`, (msg)=>{
      this.props.receiveMsg(msg)
    })
  }


  render(){
      const messsagesToDisplay = [...this.props.messages.incoming, ...this.props.messages.outgoing].sort((msgA, msgB)=>{
        return msgA.timestamp > msgB.timestamp
      })
    return(
      <div>
        <ChatDisplay messages={messsagesToDisplay}/>
        <MessageInput />
        <LanguageSelector />
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  console.log(state)
  return{
    currentLanguage: state.languages.currentLanguage,
    messages: state.transmissions.messages,
    socket: state.transmissions.socket
  }
}

export default connect(mapStateToProps, { receiveMsg, setLanguage })(ChatContainer)
