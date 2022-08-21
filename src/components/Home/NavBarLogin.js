import React from "react";
import Euronetlogo from "../../Euronetlogo.png";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../stylesheet/Navbar.css";

function NavBarLogin(props) {
  return (
    <div className="navbar">
      <Navbar
        collapseOnSelect
        expand="lg"
        fixed="top"
        style={{ backgroundColor: "white" }}
      >
        {/* <Container> */}
        <Link to="/" style={{ textDecoration: "none", color: "gray" }}>
          <Navbar.Brand href="#">
            {" "}
            <img src={Euronetlogo} alt="Euronetlogo" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link
                to="/home"
                style={{ textDecoration: "none", color: "gray" }}
              >
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="/jobdetails"
                style={{ textDecoration: "none", color: "gray" }}
              >
                Job Details
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="/aptitudequestion"
                style={{ textDecoration: "none", color: "gray" }}
              >
                Aptitude Test
              </Link>
            </Nav.Link>
            <NavDropdown title="Candidate" id="collasible-nav-dropdown">
              <Link
                to="/candidateprofile"
                style={{ textDecoration: "none", color: "gray" }}
              >
                <NavDropdown.Item href="candidateprofile">
                  Candidate Profile
                </NavDropdown.Item>
              </Link>
              {/* <NavDropdown.Item href="candidateresume">
                Candidate Resume
              </NavDropdown.Item> */}
              <Link
                to="/candidatetestscore"
                style={{ textDecoration: "none", color: "gray" }}
              >
                <NavDropdown.Item href="candidatetestscore">
                  Candidate Test Score
                </NavDropdown.Item>
              </Link>
            </NavDropdown>
            <Nav.Link>
              <Link
                to="/shortlistedresume"
                style={{ textDecoration: "none", color: "gray" }}
              >
                Shortlisted Resume
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="/finalshortlistedcandidates"
                style={{ textDecoration: "none", color: "gray" }}
              >
                Final Shortlisted Candidates
              </Link>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">
              <Link to="/" style={{ textDecoration: "none", color: "gray" }}>
                Logout
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
    </div>
  );
}

export default NavBarLogin;
