import React, { useState } from 'react';
import { Card, Form, Button } from "react-bootstrap";

function Apply() {

    const [formData, setFormData] = useState({});

    const setFieldData = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

    };


    return (
        <div>
            <Card style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <Card.Header className="applyPageCardHeader">Apply For This Position</Card.Header>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formFullName">
                            <Form.Label>Full Name</Form.Label><span className="requiredSymbol">*</span>
                            <Form.Control name="fullName" required type="text" placeholder="Enter Full Name" onChange={setFieldData} />
                            <Form.Control.Feedback type="invalid">Name is required.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmailAddress">
                            <Form.Label>Email Address</Form.Label><span className="requiredSymbol">*</span>
                            <Form.Control name="emailAddress" required type="email" placeholder="name@example.com" onChange={setFieldData} />
                            <Form.Control.Feedback type="invalid">Please enter a valid Email.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formMobile">
                            <Form.Label>Mobile</Form.Label><span className="requiredSymbol">*</span>
                            <Form.Control name="mobile" required type="tel" placeholder="0XXXXXXXXXX" pattern="[0][0-9]{10}" onChange={setFieldData} />
                            <Form.Control.Feedback type="invalid">Please enter a valid Mobile Number.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCNIC">
                            <Form.Label>CNIC</Form.Label><span className="requiredSymbol">*</span>
                            <Form.Control name="CNIC" required type="text" placeholder="13 digits without hyphen" pattern="[0-9]{13}" onChange={setFieldData} />
                            <Form.Control.Feedback type="invalid">Please enter a valid CNIC Number.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCity">
                            <Form.Label>City</Form.Label><span className="requiredSymbol">*</span>
                            <Form.Control as="select" name="city" required onChange={setFieldData}>
                                <option value=''>Select a City</option>
                                <option value="Karachi">Karachi</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">Please select a City.</Form.Control.Feedback>
                        </Form.Group>

                        <div className="d-grid">
                            <Button type="submit">Submit</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Apply