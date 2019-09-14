import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";

import { withFirebase } from "../Firebase";

import { SignUpLink } from "../SignUp";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

export const SignInLink = () => (
  <p>
    Already have an account? <Link to={ROUTES.SIGN_IN}>Log In</Link>
  </p>
);

class SignInFormBase extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.props.history.push(ROUTES.HOME);
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
    const { email, password, error } = this.state;
    const isInvalid = email === "" || password === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          type="email"
          value={email}
          onChange={this.onChange}
          placeholder="Email address"
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={this.onChange}
          placeholder="Password"
        />
        <button type="submit" disabled={isInvalid}>
          Sign in
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInPage;
