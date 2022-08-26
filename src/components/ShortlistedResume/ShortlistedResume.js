import React, { useState, useEffect } from "react";
import GridTable from "@nadavshaar/react-grid-table";
import "../../stylesheet/JobDetail.css";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  ListGroup,
  Container,
} from "react-bootstrap";

import { RiUserSearchFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { RiNewspaperFill } from "react-icons/ri";
// import getColumns from "./getColumns.js";
import axios from "axios";
import { IoMail } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
init("user_ctTO3wf4auf2drAPyOGXb");

const styles = {
  select: { margin: "0 20px" },
  buttonsCellContainer: {
    padding: "0 20px",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  editButton: {
    background: "rgb(6, 89, 167)",
    outline: "none",
    cursor: "pointer",
    padding: 9,
    marginRight: "1px",
    display: "inline-flex",
    border: "none",
    borderRadius: "0%",
    boxShadow: "1px 1px 2px 0px rgb(0 0 0 / .3)",
  },
  buttonsCellEditorContainer: {
    height: "100%",
    width: "100%",
    display: "inline-flex",
    padding: "0 20px",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  saveButton: {
    background: "white",
    outline: "none",
    cursor: "pointer",
    padding: 4,
    display: "inline-flex",
    border: "none",
    borderRadius: "0%",
    margin: "1rem",
    // boxShadow: "1px 1px 2px 0px rgb(0 0 0 / .3)",
  },
};

function ShortlistedResume(props) {
  const [rowsData, setRowsData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [candInfo, setCandInfo] = useState([]);
  const [show, setShow] = useState(false);
  async function FetchAPI2(candID) {
    const response = await fetch(
      "https://atsbackend.herokuapp.com/api/candinfo/getcandinfo/" + candID
    );

    const json = await response.json();
    setCandInfo(json.getCand[0]);
    console.log("json.getCand[0]", json.getCand[0]);
  }
  const handleClose = () => setShow(false);
  const handleShow = (candID) => {
    FetchAPI2(candID);
    setShow(true);
  };
  async function FetchAPI() {
    const response = await fetch(
      "https://atsbackend.herokuapp.com/api/shortlistresume/getshortlistedresume"
    );
    const json = await response.json();
    console.log("rowsData: ", json);
    setLoading(true);

    setTimeout(() => {
      setRowsData(json.getallshortlistedresumes);
      console.log("json.getAllCand: ", json.getallshortlistedresumes);
      setLoading(false);
    }, 1000);
  }

  const getColumns = ({ setRowsData }) => {
    return [
      {
        id: "checkbox",
        visible: true,
        pinned: true,
        width: "54px",
      },
      {
        id: "2",
        field: "short_resume_id",
        label: "Shortlisted Resume ID",
      },
      {
        id: "3",
        field: "cand_id",
        label: "Candidate ID",
        cellRenderer: ({ data }) => {
          return (
            <div>
              <button
                style={styles.saveButton}
                title={"View Candidate Information"}
                onClick={() => {
                  handleShow(data.cand_id);
                  FetchAPI(data.cand_id);
                }}
              >
                <RiUserSearchFill style={{ color: "rgb(6, 89, 167)" }} />
              </button>{" "}
              {data.cand_id}{" "}
            </div>
          );
        },
      },
      {
        id: "4",
        field: "job_id",
        label: "Job ID",
        cellRenderer: ({ data }) => {
          return (
            <div>
              <Link
                to={"/jobdetails/getjob/" + data.job_id}
                style={{ textDecoration: "none" }}
              >
                <button style={styles.saveButton} title={"View Job Detail"}>
                  <RiNewspaperFill style={{ color: "rgb(6, 89, 167)" }} />
                </button>{" "}
              </Link>
              {data.job_id}{" "}
            </div>
          );
        },
      },
      {
        id: "5",
        field: "resume_rank",
        label: "Resume Rank",
      },
      {
        id: "6",
        field: "cand_positionApplied",
        label: "Applied for Position",
      },
      {
        id: "7",
        field: "resume_matched_job",
        label: "Resume Matched to Job",
      },
      {
        id: "6",
        field: "resume_url",
        label: "View Resume",
        cellRenderer: ({ data }) => {
          return (
            <div
              className="rgt-cell-inner"
              style={{
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                marginLeft: "5rem",
              }}
            >
              <a
                href={data?.resume_url}
                target="_blank"
                style={{ fontSize: "30px", textAlign: "center" }}
              >
                <FaFilePdf style={{ color: "rgb(6, 89, 167)" }} />
              </a>
            </div>
          );
        },
      },
      {
        id: "7",
        field: "test_link_status",
        label: "Test Link",
      },
      {
        id: "buttons",
        width: "max-content",
        pinned: true,
        sortable: false,
        resizable: false,
        cellRenderer: ({
          tableManager,
          value,
          data,
          column,
          colIndex,
          rowIndex,
        }) => {
          const sendEmail = async () => {
            const response = await fetch(
              "https://atsbackend.herokuapp.com/api/candinfo/getcandinfo/" +
                data.cand_id
            );
            const json = await response.json();
            console.log("rowsData: ", json);
            var apiData = json.getCand[0];
            console.log(apiData);

            if (apiData) {
              let templateParams = {
                cand_name: apiData.cand_name,
                cand_email: apiData.cand_email,
                HR_email: "khan4100339@cloud.neduet.edu.pk",
              };
              emailjs
                .send(
                  "gmail",
                  "template_91vyob6",
                  templateParams,
                  "user_ctTO3wf4auf2drAPyOGXb"
                )
                .then(
                  (response) => {
                    alert(
                      "Successfully sent test link email to ",
                      apiData.cand_name
                    );

                    axios
                      .put(
                        "https://atsbackend.herokuapp.com/api/shortlistresume/updateTestLinkStatus/" +
                          apiData.job_id +
                          "/" +
                          apiData.cand_id,
                        {
                          test_link_status: "Assigned",
                        }
                      )
                      .then((res) => {
                        if (res.status == 200) {
                          alert("Candidate Test Link Status Updated");
                          window.location.reload();
                        } else {
                          alert("Failed to Update Candidate Test Link Status");
                        }
                      });
                  },
                  (err) => {
                    alert("Failed to Send Email Link");
                  }
                );
            }
          };
          return (
            <div style={styles.buttonsCellContainer}>
              <button
                title={"Send Test Link "}
                style={styles.editButton}
                onClick={() => sendEmail()}
              >
                <IoMail style={{ color: "white" }} />
              </button>
            </div>
          );
        },
      },
    ];
  };

  useEffect(() => {
    FetchAPI();
  }, []);

  return (
    <div className="jobdetail">
      <h5
        style={{
          backgroundColor: "rgb(6, 89, 167)",
          color: "white",
          padding: "7px",
        }}
      >
        SHORTLISTED RESUMES
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
      {show && candInfo ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Candidate Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <Container fluid>
              <Row>
                <Col style={{ padding: "1rem" }}>
                  <ListGroup variant="flush" style={{ fontSize: "13px" }}>
                    <ListGroup.Item>
                      <Row>
                        <Col>Candidate ID:</Col>
                        <Col>{candInfo.cand_id}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Name:</Col>
                        <Col>{candInfo.cand_name}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Email:</Col>
                        <Col>{candInfo.cand_email}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Contact:</Col>
                        <Col>{candInfo.cand_contact}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Highest Education:</Col>
                        <Col>{candInfo.cand_highedu}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Work Experinece:</Col>
                        <Col>{candInfo.cand_workexp} year(s)</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Gender:</Col>
                        <Col>{candInfo.cand_gender}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Preferred Shift:</Col>
                        <Col>{candInfo.cand_shiftspref}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>HEC Verified Degree:</Col>
                        <Col>{candInfo.cand_hecverif}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Applied for Position:</Col>
                        <Col>{candInfo.cand_positionApplied}</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>{" "}
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}

export default ShortlistedResume;
