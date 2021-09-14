import React, { useContext } from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
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
        <button className={"nav-button"} style={{ marginRight: "10px" }}>
          <Icon icon={"bookmark"} style={{ marginRight: "10px" }} />
          Watchlist
        </button>

        <NavDropdown title={user.first_name} id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to={`/user/${user.id}`}>
            <Icon icon={"user"} style={{ marginRight: "10px" }} />
            Profile
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={logOut}>
            <Icon icon={"sign-out-alt"} style={{ marginRight: "10px" }} />
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </>
    );
  };

  const logOut = () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if (refreshToken) {
      UserService.logOut({ refresh_token: refreshToken }).finally(() => {
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
        <Nav className="me-auto" />

        <Nav justify={"space-between"}>
          {!user && loggedOutOptions()}

          {user && loggedInOptions()}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
