import React, { useContext } from "react";

import { Button, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import "assets/css/Navbar.css";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "constant";
import { UserContext } from "context/UserContext";
import UserService from "services/UserService";

const AppNavbar = () => {
  const { user } = useContext(UserContext);

  const loggedOutOptions = () => {
    return (
      <>
        <Button as={Link} to="/signup" className={"nav-button"} eventKey="2">
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
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if (refreshToken) {
      UserService.logOut({ refresh_token: refreshToken }).finally((response) => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        window.location.reload();
      });
    }
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
