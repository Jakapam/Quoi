import React, { Component } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import { signUp } from '../actions/users'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import StyledSpan from '../components/StyledSpan'
import { createSocket } from '../actions/transmissions'
import { Container } from 'semantic-ui-react'

class SignUp extends Component{

  state = {
    username: "",
    password: "",
    passwordConfirm: "",
    errorMsg: ""
  }

  handleSubmit= ()=>{
    if(this.state.passwordConfirm === "" ||
    this.state.password === "" ||
    this.state.username === ""){
      this.setState({ errorMsg: "All Fields Must Be Filled In"})
    } else if(this.state.password !== this.state.passwordConfirm){
      this.setState({errorMsg: "Password and Confirmation Must Match"} )
    } else if(this.state.password.length < 6){
      this.setState({errorMsg: "Password must be longer than 6 characters"} )
    } else {
      this.props.createSocket();
      this.props.signUp({
        username: this.state.username,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirm
      })
      this.setState({
        username: "",
        password: "",
        passwordConfirm: ""
      })
    }
  }

  handleChange= (event, {name, value})=>{
    this.setState( {[name]: value } )
  }

  render(){
    return(
      <Container className="animated fadeIn" >
        <h2 style={{fontSize: 40, color: 'white', textAlign: "center"}}>Sign up</h2>
        <Form error={!!this.state.errorMsg} onSubmit={this.handleSubmit}>
          <Form.Input type="text"
            placeholder='enter username'
            name='username'
            onChange={this.handleChange}
            value={this.state.username}/>
          <Form.Input type="password"
            placeholder='enter password'
            name='password'
            onChange={this.handleChange}
            value={this.state.password}/>
          <Form.Input type="password"
            placeholder='confirm password'
            name='passwordConfirm'
            onChange={this.handleChange}
            value={this.state.passwordConfirm}/>
          <Button type="submit"
            style={{display:'none'}}>submit</Button>
          <Message
            error
             content={this.state.errorMsg}
           />
        </Form>
        <p style={{ color: 'white', textAlign: "center", fontWeight: 'bold'}}>
          Already have an account?&nbsp;
          <Link to="/login">
            <StyledSpan text={"Log In"}/>
          </Link>
          !
        </p>
        <p className="animated fadeIn" style={{ color: 'white', textAlign: "center", fontWeight: 'bold'}}>
          <Link to="/">
            <StyledSpan text={"Home"}/>
          </Link>
        </p>
      </Container>
    )
  }

}

export default connect(null, {signUp, createSocket})(SignUp)
