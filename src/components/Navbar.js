import React from "react";
import {Navbar, Nav, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import "../assets/css/Navbar.css";

const AppNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" variant={"dark"}>
      <Navbar.Brand as={Link} to="/">
        IMDb
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto"></Nav>

        <Nav justify={"space-between"}>
          <Button as={Link} to="/signup" className={"nav-button"}>
            Sign Up
          </Button>
          <Button as={Link} to="/signin" className={"nav-button"}>
            Sign In
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
