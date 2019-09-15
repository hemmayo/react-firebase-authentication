import React, { Component } from "react";
import { withAuthorization } from "../Session";
class HomePage extends Component {
  render() {
    return <div>This page is seen by anyone that's logged in.</div>;
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
