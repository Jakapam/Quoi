import React from "react";
import UserListItem from "./UserListItem";
import { List, Icon } from "semantic-ui-react";

const UserList = props => {
  const userList = props.users.map((user, index) => {
    return (
      <UserListItem
        key={index}
        username={user.username}
        language={user.language}
      />
    );
  });

  return (
    <div
      style={{
        padding: 20,
        height: "60vh",
        overflow: "auto",
        backgroundColor: "white",
        borderRadius: "5%"
      }}>
      <Icon name="users" />
      <List>{userList}</List>
    </div>
  );
};

export default UserList;
