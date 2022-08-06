import React, { useState, useEffect } from "react";
// import MaterialTable from 'material-table';
import GridTable from "@nadavshaar/react-grid-table";
import getColumns from "./getColumns.js";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../stylesheet/JobDetail.css";

function AptitudeTest(props) {
  const [show, setShow] = useState(false);
  const [rowsData, setRowsData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function FetchAPI() {
      const response = await fetch(
        "https://atsbackend.herokuapp.com/api/aptTest/getapttests"
      );
      const json = await response.json();
      setLoading(true);
      setTimeout(() => {
        setRowsData(json.getAllAptTest);
        setLoading(false);
      }, 1500);
    }
    FetchAPI();
  }, [rowsData]);
  return (
    <div className="job-detail-list">
      <Link
        to="/aptitudequestion/addnewquestion"
        style={{ textDecoration: "none", color: "gray" }}
      >
        <Button
          style={{
            backgroundColor: "rgb(6, 89, 167)",
            color: "white",
            border: "none",
          }}
        >
          {" "}
          Add New Aptitude Question{" "}
        </Button>
      </Link>
      <p></p>
      <h5
        style={{
          backgroundColor: "rgb(6, 89, 167)",
          color: "white",
          padding: "7px",
        }}
      >
        APTITUDE TEST QUESTIONS
      </h5>
      <GridTable
        columns={getColumns({ setRowsData })}
        rows={rowsData}
        isLoading={isLoading}
        onRowClick={({ rowIndex, data, column, isEdit, event }, tableManager) =>
          !isEdit &&
          tableManager.rowSelectionApi.getIsRowSelectable(data.id) &&
          tableManager.rowSelectionApi.toggleRowSelection(data.id)
        }
      />

      {show == true ? (
        <Modal show={show} centered>
          <Modal.Header>
            <Modal.Title> Add New Aptitude Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Text className="text-muted">Aptitude Test ID</Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="memberno"
                    placeholder=""
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">
                    Selected Category
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="name"
                    placeholder=" "
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">Question</Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="name"
                    placeholder=" "
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">Options</Form.Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">Option A</Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="name"
                    placeholder=" "
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">Option A</Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="name"
                    placeholder=" "
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">Option C</Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="name"
                    placeholder=" "
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Text className="text-muted">Correct Answer</Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="name"
                    placeholder=" "
                  />
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button
              style={{ backgroundColor: "rgb(6, 89, 167)", color: "white" }}
            >
              Add Question
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}

export default AptitudeTest;
