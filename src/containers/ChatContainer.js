import React, { Component } from "react";
import RoomContainer from "./RoomContainer";
import { createSocket, fetchOwnMessages } from "../actions/transmissions";
import { setLanguage } from "../actions/languages";
import { connect } from "react-redux";
import { Image } from "semantic-ui-react";
import title from "../fulltitle.png";
import LogoutButton from "./LogoutButton";

class ChatContainer extends Component {
  componentWillMount() {
    if (!this.props.socket) {
      this.props.createSocket();
    }
  }

  componentDidMount() {
    this.props.fetchOwnMessages(this.props.username);
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
        <LogoutButton />
        <Image src={title} style={imgStyle} size="small" />
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
  fetchOwnMessages,
  setLanguage
})(ChatContainer);
