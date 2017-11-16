import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "./actions/users";
import ChatContainer from "./containers/ChatContainer";
import { Route, withRouter } from "react-router-dom";
import SpeechTranslator from "./containers/SpeechTranslator";
import SignUp from "./containers/SignUp";
import Login from "./containers/Login";
import Home from "./components/Home";
import {
  userIsNotAuthenticated,
  userIsAuthenticated
} from "./utils/authentication";

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.setUser(localStorage.getItem("token"));
    }
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={userIsNotAuthenticated(Home)} />
        <Route path="/chat" component={userIsAuthenticated(ChatContainer)} />
        <Route path="/login" component={userIsNotAuthenticated(Login)} />
        <Route path="/signup" component={userIsNotAuthenticated(SignUp)} />
        <Route path="/interpreter" component={SpeechTranslator} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { users: state.users };
};

export default withRouter(connect(mapStateToProps, { setUser })(App));
