import React, { Component } from "react";
import Room from "../components/Room";
import { receiveMsg, systemMsg } from "../actions/transmissions";
import { connect } from "react-redux";

class RoomContainer extends Component {
  state = {
    atBottomNewMessages: false,
    roomName: "Room1"
  };

  componentWillMount() {
    this.props.socket.emit("join-room", {
      user: this.props.user,
      room: this.state.roomName
    });
  }

  componentDidMount() {
    this.props.socket.on("chatMsg-en", msg => {
      this.props.receiveMsg(msg);
    });
    this.props.socket.on("system", msg => {
      this.props.systemMsg(msg);
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
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user.username,
    messages: state.transmissions.messages,
    socket: state.transmissions.socket
  };
};

export default connect(mapStateToProps, {
  receiveMsg,
  systemMsg
})(RoomContainer);
