import React from "react";
import { Button } from "semantic-ui-react";

const LogoutButton = props => {
  return (
    <Button
      style={{ marginRight: 40, marginTop: 25, zIndex: "-1" }}
      floated="right"
      onClick={props.logout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
