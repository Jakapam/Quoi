import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { sendMsg } from '../actions/transmissions'
import { connect } from 'react-redux';

class MessageInput extends Component{

  state = {
    msgInput: "",
    messageInfo: `140 characters remaining`,
    animationError: false,
    msgLimit: 140
    
  }


  handleSubmit= ()=>{

    if(this.state.msgInput.length < this.state.msgLimit && this.state.msgInput !== ""){
      const msg={
        sender: this.props.username,
        content: this.state.msgInput,
        timestamp: Date.now()
      }

      this.props.sendMsg(msg)
      this.props.socket.emit('chatMsgServer', msg)
      this.setState({
        msgInput: "",
        messageInfo: `${this.state.msgLimit} characters remaining`,
        animationError: false
      })
    } else {

      this.setState({
        animationError: true
      })
      const setAnimationErrorStateToFalse = ()=>this.setState({
        animationError: false
      })
      setTimeout(setAnimationErrorStateToFalse, 1000)
    }

  }

  handleChange= (event, {value})=>{

    let message;

    this.setState({
      msgInput: value,
    },()=>{
      if(this.state.msgInput.length < this.state.msgLimit){
        message = `${this.state.msgLimit-this.state.msgInput.length} characters remaining`
        this.setState({ animationError: false })
      } else {
        message = 'Message too long'
      }
      this.setState({ messageInfo: message})
    })

  }

  render(){
    console.log(this.state.animationError)
    return(
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            type="textarea"
            placeholder='enter a message'
            floated="right"
            onChange={this.handleChange}
            value={this.state.msgInput}
            className={ this.state.animationError? "animated shake" : null}
          />
          </Form>
          <p style={{color: 'white', fontStyle: 'italic'}}>{this.state.messageInfo}</p>
      </div>
    )
  }

}

const mapStateToProps = (state)=>{
  return {
    username: state.user.user.username,
    socket: state.transmissions.socket
  }
}

export default connect(mapStateToProps, {sendMsg})(MessageInput)
