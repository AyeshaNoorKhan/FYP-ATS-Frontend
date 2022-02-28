import React from 'react';
import Euronetlogo from '../../Euronetlogo.png';
import {Navbar,Container} from 'react-bootstrap';


function Header(props) {
    return (
        <div>
            <Navbar fixed="top" style={{backgroundColor:"white"}}>
                <Container>
                <Navbar.Brand href="#"> <img src={Euronetlogo}  alt="Euronetlogo" /></Navbar.Brand>
                </Container>
            </Navbar>  
        </div>
    );
}

export default Header;