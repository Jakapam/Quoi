import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { login } from '../actions/users'
import { connect } from 'react-redux';

class Login extends Component{

  state = {
    username: "",
    password: "",
    errorMsg: ""
  }


  handleSubmit= ()=>{
    if(this.state.password === "" ||
    this.state.username === ""){
      this.setState({ errorMsg: "All Fields Must Be Filled In"})
    } else {
      this.props.login({
        username: this.state.username,
        password: this.state.password,
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
        <h1 style={{fontSize: 60, color: 'white', textAlign: "center"}}>Log into globeChatter!</h1>
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
          <Button type="submit"
            style={{display:'none'}}>submit</Button>
        </Form>
      </div>
    )
  }

}

export default connect(null, {login})(Login)
