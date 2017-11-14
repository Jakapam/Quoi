import React from "react";
import UsernameItem from "./UsernameItem";
import { List, Icon } from "semantic-ui-react";

const UserList = props => {
  const userList = props.users.map((username, index) => {
    return <UsernameItem key={username} username={username} />;
  });

  return (
    <div
      style={{
        padding: 20,
        height: "60vh",
        overflow: "auto",
        backgroundColor: "white",
        borderRadius: "5%",
        marginBottom: 25
      }}>
      <Icon name="users" />
      <List>{userList}</List>
    </div>
  );
};

export default UserList;
