import React from 'react';
import {Card,Button,Form} from 'react-bootstrap';
import {Link} from "react-router-dom";
import '../../stylesheet/Login.css';

function Login(props) {
    return (
        <div className="login">
            <Card>
                <Card.Header as="h6" style={{backgroundColor:"rgb(0, 51, 153)",color:"white"}}>Admin Login</Card.Header>
                <Card.Body style={{backgroundColor:"rgb(204, 204, 204)",color:"white"}}>
                <Form style={{fontSize:"small",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <Form.Group  controlId="formBasicEmail">
                            <Form.Label style={{color:"gray",fontWeight:"bold"}}>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group  controlId="formBasicPassword">
                            <Form.Label style={{color:"gray",fontWeight:"bold"}}>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <br/>
                        </Form>
                        <Link to="/home"><Button style={{backgroundColor:"rgb(0, 51, 153)",color:"white",float:"right"}} type="submit">
                            Login
                        </Button></Link>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;