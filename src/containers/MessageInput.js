import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { sendMsg } from '../actions/transmissions'
import { connect } from 'react-redux';

class MessageInput extends Component{

  state = {
    msgInput: "",
    lengthError: true
  }


  handleSubmit= ()=>{
    console.log("submitted")
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

  handleChange= (event, {value})=>{
    this.setState({
      msgInput: value
    })
  }

  render(){
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Input type="textarea"
          placeholder='enter a message'
          floated="right"
          onChange={this.handleChange} value={this.state.msgInput}/>
      </Form>
    )
  }

}

const mapStateToProps = (state)=>{
  console.log(state.user)
  return {
    username: state.user.user.username,
    socket: state.transmissions.socket
  }
}

export default connect(mapStateToProps, {sendMsg})(MessageInput)
