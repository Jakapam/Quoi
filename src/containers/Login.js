import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { login } from '../actions/users'
import { createSocket } from '../actions/transmissions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import StyledSpan from '../components/StyledSpan'
import { Container, Grid } from 'semantic-ui-react'

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
      this.props.createSocket();
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
      <Container className="animated fadeIn" >
        <h2 style={{fontSize: 40, color: 'white', textAlign: "center"}}>Login</h2>
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
        <p style={{ color: 'white', textAlign: "center", fontWeight: 'bold'}}>
          Don't have an account?&nbsp;
          <Link to="/signup">
            <StyledSpan text={"Sign Up"}/>
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

export default connect(null, {login, createSocket})(Login)
