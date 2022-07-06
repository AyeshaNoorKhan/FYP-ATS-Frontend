import React from "react";
import {
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  FloatingLabel,
} from "react-bootstrap";
import "../../stylesheet/JobDetail.css";

function AddJobModal(props) {
  return (
    <div className="jobdetail">
      <h4
        style={{
          backgroundColor: "rgb(0, 51, 153)",
          color: "white",
          padding: "5px",
        }}
      >
        Add a New Job
      </h4>
      <p style={{ backgroundColor: "gray", color: "white", padding: "3px" }}>
        Clearly write the decription of job
      </p>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Text className="text-muted">Job ID</Form.Text>
            <Form.Control
              size="sm"
              type="text"
              name="memberno"
              placeholder=""
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Text className="text-muted">Job Code</Form.Text>
            <Form.Control
              size="sm"
              type="text"
              name="memberno"
              placeholder=""
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Text className="text-muted">Job Category</Form.Text>
            <Form.Control size="sm" type="text" name="name" placeholder=" " />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Text className="text-muted">Job Title</Form.Text>
            <Form.Control size="sm" type="text" name="name" placeholder=" " />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Text className="text-muted">Job Location</Form.Text>
            <Form.Control size="sm" type="text" name="name" placeholder=" " />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Text className="text-muted">Job Positions</Form.Text>
            <Form.Control size="sm" type="text" name="name" placeholder=" " />
          </Form.Group>
        </Row>

        <Form.Text className="text-muted">Job Experience</Form.Text>
        <Form.Control size="sm" type="text" name="name" placeholder=" " />

        <br />
        <Form.Text className="text-muted">Job Description</Form.Text>

        <InputGroup>
          <InputGroup.Text>A.</InputGroup.Text>
          <FormControl as="textarea" aria-label="With textarea" />
        </InputGroup>

        <br />
        <InputGroup>
          <InputGroup.Text>B.</InputGroup.Text>
          <FormControl as="textarea" aria-label="With textarea" />
        </InputGroup>

        <br />
        <InputGroup>
          <InputGroup.Text>C.</InputGroup.Text>
          <FormControl as="textarea" aria-label="With textarea" />
        </InputGroup>

        <br />
        <InputGroup>
          <InputGroup.Text>D.</InputGroup.Text>
          <FormControl as="textarea" aria-label="With textarea" />
        </InputGroup>

        <br />
        <InputGroup>
          <InputGroup.Text>E.</InputGroup.Text>
          <FormControl as="textarea" aria-label="With textarea" />
        </InputGroup>

        <br />
        <InputGroup>
          <InputGroup.Text>F.</InputGroup.Text>
          <FormControl as="textarea" aria-label="With textarea" />
        </InputGroup>

        <br />
        <InputGroup>
          <InputGroup.Text>G.</InputGroup.Text>
          <FormControl as="textarea" aria-label="With textarea" />
        </InputGroup>

        <br />
        <InputGroup>
          <InputGroup.Text>H.</InputGroup.Text>
          <FormControl as="textarea" aria-label="With textarea" />
        </InputGroup>

        <br />
        <Form.Text className="text-muted">Job Qualification</Form.Text>

        <InputGroup>
          <InputGroup.Text>A.</InputGroup.Text>
          <FormControl as="textarea" aria-label="With textarea" />
        </InputGroup>

        <br />
        <InputGroup>
          <InputGroup.Text>B.</InputGroup.Text>
          <FormControl as="textarea" aria-label="With textarea" />
        </InputGroup>

        <br />
        <InputGroup>
          <InputGroup.Text>C.</InputGroup.Text>
          <FormControl as="textarea" aria-label="With textarea" />
        </InputGroup>

        <br />
        <InputGroup>
          <InputGroup.Text>D.</InputGroup.Text>
          <FormControl as="textarea" aria-label="With textarea" />
        </InputGroup>

        <br />
        <InputGroup>
          <InputGroup.Text>E.</InputGroup.Text>
          <FormControl as="textarea" aria-label="With textarea" />
        </InputGroup>
      </Form>
      <br />
      <Button
        style={{
          backgroundColor: "rgb(0, 51, 153)",
          color: "white",
          float: "right",
        }}
      >
        Add Job
      </Button>
    </div>
  );
}

export default AddJobModal;
