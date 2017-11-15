import React from "react";
import MsgItemIncoming from "./MsgItemIncoming";
import MsgItemOutgoing from "./MsgItemOutgoing";
import SystemMsg from "./SystemMsg";
import { List } from "semantic-ui-react";

const MsgList = props => {
  const goToBottom = event => {
    event.currentTarget.scrollTop =
      event.currentTarget.scrollHeight - event.currentTarget.clientHeight;
  };

  const incoming = props.incoming.map((msg, index) => {
    return <MsgItemIncoming key={msg.timestamp} msg={msg} />;
  });

  const outgoing = props.outgoing.map((msg, index) => {
    return <MsgItemOutgoing key={msg.timestamp} msg={msg} />;
  });

  const system = props.system.map((msg, index) => {
    return <SystemMsg key={msg.timestamp} msg={msg} />;
  });

  const msgList = [...incoming, ...outgoing, ...system].sort((msgA, msgB) => {
    return msgA.props.msg.timestamp - msgB.props.msg.timestamp;
  });

  return (
    <div
      ref={props.scrollRef}
      onClick={goToBottom}
      style={{
        paddingTop: 10,
        height: "60vh",
        overflow: "auto",
        backgroundColor: "white",
        borderRadius: "2%"
      }}>
      <List>{msgList}</List>
    </div>
  );
};

export default MsgList;
