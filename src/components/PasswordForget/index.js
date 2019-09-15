import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";

const PasswordForgetPage = () => (
  <div>
    <h1>Reset Password</h1>
    <PasswordForgetForm />
    <PasswordForgetLink />
  </div>
);

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot password?</Link>
  </p>
);

const INITIAL_STATE = { email: "", error: null };

class PasswordForgetFormBase extends Component {
  state = {
    ...INITIAL_STATE
  };
  onSubmit = event => {
    this.props.firebase
      .doPasswordReset(this.state.email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { email, error } = this.state;
    const isInvalid = email === "";
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email address"
          onChange={this.onChange}
        />
        <button type="submit" disabled={isInvalid}>
          Reset Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export default PasswordForgetPage;
export { PasswordForgetForm, PasswordForgetLink };
