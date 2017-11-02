import React, { Component } from 'react'
import { sendMsg } from '../actions/transmissions'
import { connect } from 'react-redux';

class MessageInput extends Component{

  state = {
    msgInput: ""
  }


  handleSubmit= (event)=>{
    event.preventDefault();
    const msg={
      sender: this.props.username,
      content: this.state.msgInput,
      timestamp: Date.now()
    }

    this.props.sendMsg(msg)
    this.props.socket.emit('chatMsgServer', msg)
    this.setState({
      msgInput: ""
    })
  }

  handleChange= (event)=>{
    this.setState({
      msgInput: event.target.value
    })
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="textarea" onChange={this.handleChange} value={this.state.msgInput}></input>
      </form>
    )
  }

}

const mapStateToProps = (state)=>{
  return {
    username: state.user.username,
    socket: state.transmissions.socket
  }
}

export default connect(mapStateToProps, {sendMsg})(MessageInput)
