import React, { Component } from "react";
import RoomContainer from "./RoomContainer";
import { createSocket } from "../actions/transmissions";
import { setLanguage, fetchLanguages } from "../actions/languages";
import { logout } from "../actions/users";
import { connect } from "react-redux";
import { Image } from "semantic-ui-react";
import title from "../fulltitle.png";
import LogoutButton from "../components/LogoutButton";

class ChatContainer extends Component {
  componentWillMount() {
    if (!this.props.socket) {
      this.props.createSocket();
    }
  }

  componentDidMount() {
    this.props.fetchLanguages();
    this.props.setLanguage(this.props.languageCode);
  }

  render() {
    const imgStyle = {
      display: "block",
      margin: "0 auto"
    };

    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)"
        }}
        className="animated fadeIn">
        <LogoutButton logout={this.props.logout} />
        <Image
          className="hide-on-mobile"
          src={title}
          style={imgStyle}
          size="small"
        />
        <RoomContainer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.user.username,
    language: state.user.user.language,
    languageCode: state.user.user.language_code,
    socket: state.transmissions.socket
  };
};

export default connect(mapStateToProps, {
  createSocket,
  setLanguage,
  fetchLanguages,
  logout
})(ChatContainer);
