import React, { useState } from 'react';
import { Card, Form, Button } from "react-bootstrap";

function Apply() {

    const [formData, setFormData] = useState({});

    const setFieldData = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : (target.type === 'file' ? target.files[0] : target.value);
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
        console.log(JSON.stringify(formData));
        console.log(formData.resume);
        setValidated(true);

    };


    return (
        <div>
            <Card style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <Card.Header className="applyPageCardHeader">Apply For This Position</Card.Header>
                <Card.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formFullName">
                            <Form.Label>Full Name<span className="requiredSymbol">*</span></Form.Label>
                            <Form.Control name="fullName" required type="text" placeholder="Enter Full Name" onChange={setFieldData} />
                            <Form.Control.Feedback type="invalid">Name is required.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmailAddress">
                            <Form.Label>Email Address<span className="requiredSymbol">*</span></Form.Label>
                            <Form.Control name="emailAddress" required type="email" placeholder="name@example.com" onChange={setFieldData} />
                            <Form.Control.Feedback type="invalid">Please enter a valid Email.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formMobile">
                            <Form.Label>Mobile<span className="requiredSymbol">*</span></Form.Label>
                            <Form.Control name="mobile" required type="tel" placeholder="0XXXXXXXXXX" pattern="[0][0-9]{10}" onChange={setFieldData} />
                            <Form.Control.Feedback type="invalid">Please enter a valid Mobile Number.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCNIC">
                            <Form.Label>CNIC<span className="requiredSymbol">*</span></Form.Label>
                            <Form.Control name="CNIC" required type="text" placeholder="13 digits without hyphen" pattern="[0-9]{13}" onChange={setFieldData} />
                            <Form.Control.Feedback type="invalid">Please enter a valid CNIC Number.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCity">
                            <Form.Label>City<span className="requiredSymbol">*</span></Form.Label>
                            <Form.Select name="city" required onChange={setFieldData}>
                                <option value=''>Select a City</option>
                                <option value="Karachi">Karachi</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Please select a value.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGender">
                            <Form.Label>Gender<span className="requiredSymbol">*</span></Form.Label>
                            <div>
                                <Form.Check inline value="Male" label="Male" name="gender" type="radio" required onClick={setFieldData}></Form.Check>
                                <Form.Check inline value="Female" label="Female" name="gender" type="radio" required onClick={setFieldData}></Form.Check>
                            </div>
                            <Form.Control.Feedback type="invalid">Gender is required.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formShift">
                            <Form.Label>Preferred Shift<span className="requiredSymbol">*</span></Form.Label>
                            <Form.Select name="shift" required onChange={setFieldData}>
                                <option value=''>Select a Shift</option>
                                <option value="Day">Day</option>
                                <option value="Night">Night</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Please select a value.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEducation">
                            <Form.Label>Highest Education Level<span className="requiredSymbol">*</span></Form.Label>
                            <Form.Select name="education" required onChange={setFieldData}>
                                <option value=''>Select Education</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Master">Master</option>
                                <option value="Phd/Doctorate">Phd/Doctorate</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Please select a value.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formExperience">
                            <Form.Label>Work Experience<span className="requiredSymbol">*</span></Form.Label>
                            <Form.Control name="experience" required type="number" min="0" max="60" placeholder="Enter Years of Experience (number)" onChange={setFieldData} />
                            <Form.Control.Feedback type="invalid">Work Experience is required.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formResume" className="mb-3">
                            <Form.Label>Upload Resume<span className="requiredSymbol">*</span></Form.Label>
                            <Form.Control name="resume" type="file" accept="application/pdf" required onChange={setFieldData} />
                            <Form.Control.Feedback type="invalid">Resume (pdf) is required.</Form.Control.Feedback>
                        </Form.Group>



                        <footer className="d-grid">
                            <Button type="submit">Submit Application</Button>
                        </footer>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Apply