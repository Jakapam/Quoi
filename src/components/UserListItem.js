import React from "react";
import { List } from "semantic-ui-react";

const UserListItem = props => {
  const itemStyle = {
    marginTop: 5,
    color: "black",
    textAlign: "center",
    padding: 5,
    fontSize: 15
  };

  return (
    <List.Item>
      <List.Content floated="left" style={itemStyle}>
        {props.username}{" "}
        <span style={{ fontStyle: "italic" }}>({props.language})</span>
      </List.Content>
    </List.Item>
  );
};

export default UserListItem;
