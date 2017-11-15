import React, { Component } from "react";
import Room from "../components/Room";
import {
  receiveMsg,
  systemMsg,
  handleIncomingBulkMsgs
} from "../actions/transmissions";
import { connect } from "react-redux";

class RoomContainer extends Component {
  state = {
    atBottomNewMessages: false,
    roomName: "Room1",
    users: []
  };

  componentWillMount() {
    this.props.socket.emit("join-room", {
      username: this.props.username,
      room: this.state.roomName,
      language: this.props.language,
      languageCode: this.props.languageCode
    });
    this.props.socket.on("bulkMsgs", bulkMsgs => {
      this.props.handleIncomingBulkMsgs(bulkMsgs);
    });
  }

  componentDidMount() {
    this.props.socket.on(`chatMsg-${this.props.languageCode}`, msg => {
      this.props.receiveMsg(msg);
    });
    this.props.socket.on(`system-${this.props.languageCode}`, msg => {
      this.props.systemMsg(msg);
    });
    this.props.socket.on("userlist", userlist => {
      this.setState({ users: userlist });
    });
  }

  componentWillReceiveProps() {
    if (
      this.scrollElement.scrollTop ===
      this.scrollElement.scrollHeight - this.scrollElement.clientHeight
    ) {
      this.setState({
        atBottomNewMessages: true
      });
    } else {
      this.setState({
        atBottomNewMessages: false
      });
    }
  }

  componentDidUpdate() {
    if (this.scrollElement && this.state.atBottomNewMessages) {
      this.scrollElement.scrollTop =
        this.scrollElement.scrollHeight - this.scrollElement.clientHeight;
    }
  }

  render() {
    const incomingMsgs = this.props.messages.incoming;
    const outgoingMsgs = this.props.messages.outgoing;
    const systemMsgs = this.props.messages.system;

    return (
      <div>
        <Room
          scrollRef={el => (this.scrollElement = el)}
          incoming={incomingMsgs}
          outgoing={outgoingMsgs}
          system={systemMsgs}
          users={this.state.users}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.user.username,
    language: state.user.user.language,
    languageCode: state.user.user.language_code,
    messages: state.transmissions.messages,
    socket: state.transmissions.socket
  };
};

export default connect(mapStateToProps, {
  receiveMsg,
  systemMsg,
  handleIncomingBulkMsgs
})(RoomContainer);
