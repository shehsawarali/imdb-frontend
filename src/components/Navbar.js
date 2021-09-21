import React, { useContext } from "react";

import { Button, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import "assets/css/Navbar.css";
import { NavSearch } from "components";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "constant";
import { UserContext } from "context/UserContext";
import UserService from "services/UserService";

const AppNavbar = () => {
  const { user } = useContext(UserContext);

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
    <Navbar sticky="top" collapseOnSelect expand="lg" variant={"dark"}>
      <Navbar.Brand as={Link} to="/">
        IMDb
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className={"justify-content-between"}>
        <Nav className={"me-auto w-50 absolute-center"}>
          <NavSearch />
        </Nav>

        <Nav />

        <Nav justify={"space-between"}>
          {!user && loggedOutOptions()}

          {user && loggedInOptions()}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
