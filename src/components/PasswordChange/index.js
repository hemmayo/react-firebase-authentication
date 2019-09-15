import React, { Component } from "react";
import { withFirebase } from "../Firebase";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class PasswordChange extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    event.preventDefault();
    this.props.firebase
      .doPasswordUpdate(this.state.passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        console.log("password changed");
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne === "" || passwordOne !== passwordTwo;

    return (
      <form onSubmit={this.onSubmit}>
        <h2>Change Password</h2>
        <input
          type="password"
          name="passwordOne"
          value={passwordOne}
          placeholder="New Password"
          onChange={this.onChange}
        />
        <input
          type="password"
          name="passwordTwo"
          value={passwordTwo}
          placeholder="Confirm Password"
          onChange={this.onChange}
        />
        <button type="submit" disabled={isInvalid}>
          Change Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChange);
