import React, {useContext} from "react";

import {Button, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

import "../assets/css/Navbar.css";

import {UserContext} from "../context/UserContext";

const AppNavbar = () => {
  const {user} = useContext(UserContext);

  const loggedOutOptions = () => {
    return (
      <>
        <Button as={Link} to="/signup" className={"nav-button"}>
          Sign Up
        </Button>
        <Button as={Link} to="/signin" className={"nav-button"}>
          Sign In
        </Button>
      </>
    );
  };

  const loggedInOptions = () => {
    return (
      <>
        <Button className={"nav-button"} onClick={logOut}>
          Sign Out
        </Button>
        <Button className={"nav-button"}>{user.first_name}</Button>
      </>
    );
  };

  const logOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.reload();
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant={"dark"}>
      <Navbar.Brand as={Link} to="/">
        IMDb
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto"></Nav>

        <Nav justify={"space-between"}>
          {!user && loggedOutOptions()}

          {user && loggedInOptions()}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
