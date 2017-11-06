import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { signUp } from '../actions/users'
import { connect } from 'react-redux';


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
    }else if(this.state.password !== this.state.passwordConfirm){
      this.setState({errorMsg: "Password and Confirmation Must Match"} )
    } else {
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
      <div>
        <h1 style={{fontSize: 60, color: 'white', textAlign: "center"}}>Sign up for globeChatter!</h1>
        <Form onSubmit={this.handleSubmit}>
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
        </Form>
      </div>
    )
  }

}

export default connect(null, {signUp})(SignUp)
