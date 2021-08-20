import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" sticky={"top"} style={{padding: "0.5rem 1rem"}}>
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="me-auto">
        <Link to="/">Home</Link>
        <Link to="/features">Features</Link>
        <Link to="/pricing">Pricing</Link>
      </Nav>
    </Navbar>
  );
};

export default AppNavbar;
