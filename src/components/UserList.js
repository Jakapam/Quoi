import React from "react";
import UsernameItem from "./UsernameItem";
import { List } from "semantic-ui-react";

const MsgList = props => {
  const userList = props.users.map((username, index) => {
    return <UsernameItem key={username} username={username} />;
  });

  return (
    <div
      style={{
        paddingTop: 10,
        height: "60vh",
        overflow: "auto",
        backgroundColor: "white",
        borderRadius: "2%",
        marginBottom: 25
      }}>
      <List>{userList}</List>
    </div>
  );
};

export default userList;
