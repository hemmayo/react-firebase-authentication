import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import SignOutButton from "../SignOut";

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </li>

    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default class Navigation extends Component {
  render() {
    return (
      <div>
        {this.props.authUser ? <NavigationAuth /> : <NavigationNonAuth />}
      </div>
    );
  }
}
