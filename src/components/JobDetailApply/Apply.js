import React, { useEffect, useState } from "react";
import { Card, Form, Button, Modal } from "react-bootstrap";
import Axios from "axios";
import "./Modal.css";

function Apply({ positionApplied, jobIDparam }) {
  const [formData, setFormData] = useState({
    cand_name: "",
    cand_email: "",
    cand_contact: "",
    cand_city: "",
    cand_country: "",
    cand_highedu: "",
    cand_workexp: 0,
    cand_gender: "",
    cand_shiftspref: "",
    cand_hecverif: "",
    cand_positionApplied: positionApplied,
    job_id: jobIDparam,
    cand_Resume: {},
  });

  const setFieldData = (event) => {
    const target = event.target;
    const value =
      target.type === "checkbox"
        ? target.checked
        : target.type === "file"
        ? target.files[0]
        : target.type == "number"
        ? parseInt(target.value)
        : target.value;

    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [show, setShow] = useState(false);

  const checkFileExt = (event) => {
    const file = event.currentTarget;
    const filePath = file.value;
    const allowPdf = /\.pdf/;
    if (!/\.pdf$/i.exec(filePath)) {
      setShow(true);
      file.value = "";
    } else {
      setShow(false);
      setFieldData(event);
    }
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    console.log(formData);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }
    event.preventDefault();
    try {
      Axios.post(
        "https://atsbackend.herokuapp.com/api/candinfo/addcandinfo",
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      ).then((response) => {
        if (response.status == 200) {
          handleSuccessShow();
          event.target.reset();
        } else {
          handleFailureShow();
        }
      });
    } catch (error) {
      handleErrorShow();
      setModalError(error);
    }
  };

  const [showSuccess, setShowSuccess] = useState(false);
  const handleSuccessShow = () => setShowSuccess(true);
  const handleSuccessClose = () => setShowSuccess(false);

  const [showFailure, setShowFailure] = useState(false);
  const handleFailureShow = () => setShowFailure(true);
  const handleFailureClose = () => setShowFailure(false);

  const [showError, setShowError] = useState(false);
  const handleErrorShow = () => setShowError(true);
  const handleErrorClose = () => setShowError(false);

  const [modalError, setModalError] = useState("");

  return (
    <div>
      <Card style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
        <Card.Header className="careersCardHeader">
          Apply For This Position
        </Card.Header>
        <Card.Body
          style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}
        >
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formFullName">
              <Form.Label>
                Full Name<span className="requiredSymbol">*</span>
              </Form.Label>
              <Form.Control
                name="cand_name"
                required
                type="text"
                placeholder="Enter Full Name"
                onChange={setFieldData}
              />
              <Form.Control.Feedback type="invalid">
                Name is required.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmailAddress">
              <Form.Label>
                Email Address<span className="requiredSymbol">*</span>
              </Form.Label>
              <Form.Control
                name="cand_email"
                required
                type="email"
                placeholder="name@example.com"
                onChange={setFieldData}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid Email.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMobile">
              <Form.Label>
                Mobile<span className="requiredSymbol">*</span>
              </Form.Label>
              <Form.Control
                name="cand_contact"
                required
                type="tel"
                placeholder="0XXXXXXXXXX"
                pattern="[0][0-9]{10}"
                onChange={setFieldData}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid Mobile Number.
              </Form.Control.Feedback>
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formCNIC">
                            <Form.Label>CNIC<span className="requiredSymbol">*</span></Form.Label>
                            <Form.Control name="CNIC" required type="text" placeholder="13 digits without hyphen" pattern="[0-9]{13}" onChange={setFieldData} />
                            <Form.Control.Feedback type="invalid">Please enter a valid CNIC Number.</Form.Control.Feedback>
                        </Form.Group> */}

            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>
                City<span className="requiredSymbol">*</span>
              </Form.Label>
              <Form.Select name="cand_city" required onChange={setFieldData}>
                <option value="">Select a City</option>
                <option value="Karachi">Karachi</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a value.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>
                Country<span className="requiredSymbol">*</span>
              </Form.Label>
              <Form.Select name="cand_country" required onChange={setFieldData}>
                <option value="">Select a Country</option>
                <option value="Pakistan">Pakistan</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a value.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGender">
              <Form.Label>
                Gender<span className="requiredSymbol">*</span>
              </Form.Label>
              <div>
                <Form.Check
                  inline
                  value="Male"
                  label="Male"
                  name="cand_gender"
                  type="radio"
                  required
                  onClick={setFieldData}
                ></Form.Check>
                <Form.Check
                  inline
                  value="Female"
                  label="Female"
                  name="cand_gender"
                  type="radio"
                  required
                  onClick={setFieldData}
                ></Form.Check>
              </div>
              <Form.Control.Feedback type="invalid">
                Gender is required.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formShift">
              <Form.Label>
                Preferred Shift<span className="requiredSymbol">*</span>
              </Form.Label>
              <Form.Select
                name="cand_shiftspref"
                required
                onChange={setFieldData}
              >
                <option value="">Select a Shift</option>
                <option value="Day">Day</option>
                <option value="Night">Night</option>
                <option value="Day or Night">Day or Night</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a value.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEducation">
              <Form.Label>
                Highest Education Level<span className="requiredSymbol">*</span>
              </Form.Label>
              <Form.Select name="cand_highedu" required onChange={setFieldData}>
                <option value="">Select Education</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
                <option value="Phd/Doctorate">Phd/Doctorate</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a value.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGender">
              <Form.Label>
                HEC Recognized Degree?<span className="requiredSymbol">*</span>
              </Form.Label>
              <div>
                <Form.Check
                  inline
                  value="Yes"
                  label="Yes"
                  name="cand_hecverif"
                  type="radio"
                  required
                  onClick={setFieldData}
                ></Form.Check>
                <Form.Check
                  inline
                  value="No"
                  label="No"
                  name="cand_hecverif"
                  type="radio"
                  required
                  onClick={setFieldData}
                ></Form.Check>
              </div>
              <Form.Control.Feedback type="invalid">
                Please choose an option.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formExperience">
              <Form.Label>
                Work Experience<span className="requiredSymbol">*</span>
              </Form.Label>
              <Form.Control
                name="cand_workexp"
                required
                type="number"
                min="0"
                max="60"
                placeholder="Enter Years of Experience (number)"
                onChange={setFieldData}
              />
              <Form.Control.Feedback type="invalid">
                Work Experience is required.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formResume" className="mb-3">
              <Form.Label>
                Upload Resume<span className="requiredSymbol">*</span>
              </Form.Label>
              <Form.Control
                name="cand_Resume"
                type="file"
                accept="application/pdf"
                required
                onChange={checkFileExt}
              />
              <Form.Control.Feedback type="invalid">
                Resume (pdf) is required.
              </Form.Control.Feedback>
              {show ? (
                <Form.Text style={{ color: "#dc3545" }}>
                  Only pdf file is allowed
                </Form.Text>
              ) : null}
            </Form.Group>

            <footer className="d-grid">
              <Button
                style={{ backgroundColor: "rgb(6, 89, 167)" }}
                type="submit"
              >
                Submit Application
              </Button>
            </footer>
          </Form>
        </Card.Body>
      </Card>

      <Modal
        contentClassName="modalSuccess"
        style={{ color: "#0f5132" }}
        show={showSuccess}
        onHide={handleSuccessClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Thank You for Applying.</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSuccessClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        contentClassName="modalFailure"
        show={showFailure}
        onHide={handleFailureClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Failure</Modal.Title>
        </Modal.Header>
        <Modal.Body>Something went wrong. Try again.</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleFailureClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        contentClassName="modalFailure"
        show={showError}
        onHide={handleErrorClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalError}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleErrorClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Apply;
