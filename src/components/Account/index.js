import React, { Component } from "react";
import PasswordChange from "../PasswordChange";
import { AuthUserContext, withAuthorization } from "../Session";

class Account extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <h1>Account: {authUser.email}</h1>
            <PasswordChange />
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);
