import React from "react";
import {Navbar, Nav, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const AppNavbar = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      sticky={"top"}
      style={{padding: "0.5rem 1rem"}}
    >
      <Navbar.Brand as={Link} to="/">
        Navbar
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto"></Nav>

        <Nav justify={"space-between"}>
          <Button variant={"primary"}>Sign Up</Button>
          <Button variant={"warning"}>Sign In</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
