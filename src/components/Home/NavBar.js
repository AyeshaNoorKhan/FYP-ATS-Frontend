import React from 'react';
import Euronetlogo from '../../Euronetlogo.png';
import {Navbar,Container,Nav,NavDropdown} from 'react-bootstrap';
import {Link} from "react-router-dom";


function NavBar(props) {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" fixed="top" style={{backgroundColor:"white"}}>
            <Container>
            <Navbar.Brand href="#"> <img src={Euronetlogo}  alt="Euronetlogo" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link><Link to="/jobdetails" style={{textDecoration:"none",color:"gray"}}>Job Details</Link></Nav.Link>
                <Nav.Link ><Link to="/aptitudequestion" style={{textDecoration:"none",color:"gray"}}>Aptitude Test</Link></Nav.Link>
                <NavDropdown title="Candidate" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Candidate Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Candidate Resume</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Candidate Test</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#pricing">Shortlisted Resume</Nav.Link>
                <Nav.Link href="#pricing">Final Shortlisted Candidates</Nav.Link>
                </Nav>
                <Nav>
                <Nav.Link href="#deets">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
    );
}

export default NavBar;