import React, { Component } from "react";
import RoomContainer from "./RoomContainer";
import { createSocket } from "../actions/transmissions";
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
        <Image src={title} style={imgStyle} size="medium" />
        <RoomContainer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    socket: state.transmissions.socket
  };
};

export default connect(mapStateToProps, { createSocket })(ChatContainer);
