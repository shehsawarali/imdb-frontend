import React, { useContext, useState } from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import "assets/css/Navbar.css";
import { NavSearch, Preferences } from "components";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "constant";
import { UserContext } from "context/UserContext";
import UserService from "services/UserService";

const AppNavbar = () => {
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(false);

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
        <Button as={Link} to="/timeline" className={"nav-button me-2"}>
          <Icon icon={"history"} className={"me-2"} />
          Timeline
        </Button>

        <NavDropdown align="end" title={user.first_name}>
          <NavDropdown.Item as={Link} to={`/user/${user.id}`}>
            <Icon icon={"user"} className={"me-2"} />
            Profile
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to={`/watchlist`}>
            <Icon icon={"bookmark"} className={"me-2"} />
            Watchlist
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to={`/favorites`}>
            <Icon icon={"heart"} className={"me-2"} />
            Favorites
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => setShow(true)}>
            <Icon icon={"user-cog"} className={"me-2"} />
            Preferences
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={logOut}>
            <Icon icon={"sign-out-alt"} className={"me-2"} />
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
    <Navbar sticky="top" collapseOnSelect expand="lg" variant={"dark"}>
      <Link to={"/"} className={"text-decoration-none"}>
        <div className={"logo-container"}>Filmfilia</div>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className={"justify-content-between"}>
        <Nav className={"me-auto"}>
          <NavSearch />
        </Nav>

        <Nav />

        <Nav justify={"space-between"}>
          {!user && loggedOutOptions()}

          {user && loggedInOptions()}
        </Nav>
      </Navbar.Collapse>

      {user && <Preferences show={show} setShow={setShow} />}
    </Navbar>
  );
};

export default AppNavbar;
