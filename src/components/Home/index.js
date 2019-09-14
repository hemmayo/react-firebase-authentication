import React, { Component } from "react";
import { FirebaseContext } from "../Firebase";

export default class HomePage extends Component {
  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => {
          return <div>i have access to firebase</div>;
        }}
      </FirebaseContext.Consumer>
    );
  }
}
