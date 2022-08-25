import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GridTable from "@nadavshaar/react-grid-table";
// import getColumns from "./getColumns.js";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  ListGroup,
  Container,
} from "react-bootstrap";
import "../../stylesheet/JobDetail.css";
import axios from "axios";
import { IoMail } from "react-icons/io5";
import { RiUserSearchFill } from "react-icons/ri";
import { FaChartBar } from "react-icons/fa";
import { RiNewspaperFill } from "react-icons/ri";
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

function FinalShortlistedCandidates(props) {
  const [rowsData, setRowsData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [candInfo, setCandInfo] = useState([]);
  const [show, setShow] = useState(false);
  async function FetchAPI2(candID) {
    const response = await fetch(
      "https://atsbackend.herokuapp.com/api/candinfo/getcandinfo/" + candID
    );

    const json = await response.json();
    // setLoading(true);

    // setTimeout(() => {
    setCandInfo(json.getCand[0]);
    console.log("json.getCand[0]", json.getCand[0]);
    // setLoading(false);
    // }, 3000);
  }
  const handleClose = () => setShow(false);
  const handleShow = (candID) => {
    FetchAPI2(candID);
    setShow(true);
  };
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
        field: "shortlisted_cand_Id",
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
        field: "total_score",
        label: "Aptitude Score",
        cellRenderer: ({ data }) => {
          return (
            <div>
              <Link
                to={
                  "/candidatetestscore/graphicalscoreview/" +
                  data.job_id +
                  "/" +
                  data.cand_id
                }
                style={{ textDecoration: "none" }}
              >
                <button
                  style={styles.saveButton}
                  title={"View Test Score Results"}
                >
                  <FaChartBar style={{ color: "rgb(6, 89, 167)" }} />
                </button>{" "}
              </Link>
              {data.total_score}{" "}
            </div>
          );
        },
      },
      {
        id: "6",
        field: "resume_rank",
        label: "Resume Rank",
      },
      {
        id: "7",
        field: "final_interview_link_status",
        label: "Onsite Interview",
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
          const updateFinalInterviewStatus = (jobId, candId, emailStatus) => {
            axios
              .put(
                "https://atsbackend.herokuapp.com/api/shortlistcandidate/updateFinalInterviewStatus/" +
                  jobId +
                  "/" +
                  candId,
                {
                  final_interview_link_status: emailStatus,
                }
              )
              .then((res) => {
                if (res.status == 200) {
                  alert("Candidate Final Interview Status Updated");
                  window.location.reload();
                } else {
                  alert("Failed to Update Final Interview Status");
                }
              });
          };
          const sendRejectionEmail = async () => {
            const response = await fetch(
              "https://atsbackend.herokuapp.com/api/candinfo/getcandinfo/" +
                data.cand_id
            );
            const json = await response.json();
            var apiData = json.getCand[0];

            if (apiData) {
              let templateParams = {
                cand_name: apiData.cand_name,
                cand_email: apiData.cand_email,
                HR_email: "khan4100339@cloud.neduet.edu.pk",
                Text_one:
                  "but, you have been unsuccessful in moving on to the next stage of recruiting.",
                Text_two:
                  "We will keep your resume on file and may contact you about future opportunities that fit your qualifications, skills, and experience. We strongly encourage you to pursue other possibilities with us in the future.",
                Text_three:
                  "We wish you the best of luck with your career search.",
              };
              emailjs
                .send(
                  "gmail",
                  "template_18xl4pn",
                  templateParams,
                  "user_ctTO3wf4auf2drAPyOGXb"
                )
                .then(
                  (response) => {
                    alert(
                      "Successfully Sent Rejection Interview Email to ",
                      apiData.cand_name
                    );
                    updateFinalInterviewStatus(
                      apiData.job_id,
                      apiData.cand_id,
                      "Rejected"
                    );
                  },
                  (err) => {
                    alert("Failed to Send Rejection Interview Email");
                  }
                );
            }
          };
          const sendSelectionEmail = async () => {
            const response = await fetch(
              "https://atsbackend.herokuapp.com/api/candinfo/getcandinfo/" +
                data.cand_id
            );
            const json = await response.json();
            var apiData = json.getCand[0];

            if (apiData) {
              let templateParams = {
                cand_name: apiData.cand_name,
                cand_email: apiData.cand_email,
                HR_email: "khan4100339@cloud.neduet.edu.pk",
                Text_one:
                  "and we are glad to inform you that you have been successful in moving on to the next stage of recruiting.",
                Text_two:
                  "We will be going to contact you shortly for further recruitment process.",
                Text_three:
                  "We wish you the best of luck for further recruitment process and looking forward to contact with you.",
              };
              emailjs
                .send(
                  "gmail",
                  "template_18xl4pn",
                  templateParams,
                  "user_ctTO3wf4auf2drAPyOGXb"
                )
                .then(
                  (response) => {
                    alert(
                      "Successfully Sent Selection Interview Email to ",
                      apiData.cand_name
                    );
                    updateFinalInterviewStatus(
                      apiData.job_id,
                      apiData.cand_id,
                      "Selected"
                    );
                  },
                  (err) => {
                    alert("Failed to Send Selection Interview Email");
                  }
                );
            }
          };
          return (
            <div style={styles.buttonsCellContainer}>
              <button
                title={"Interview Selection Email"}
                style={styles.editButton}
                onClick={() => sendSelectionEmail()}
              >
                <IoMail style={{ color: "rgb(144,238,144)" }} />
              </button>
              <button
                title={"Interview Rejection Email"}
                style={styles.editButton}
                onClick={() => sendRejectionEmail()}
              >
                <IoMail style={{ color: "rgb(254,39,18)" }} />
              </button>
            </div>
          );
        },
      },
    ];
  };
  async function FetchAPI() {
    const response = await fetch(
      "https://atsbackend.herokuapp.com/api/shortlistcandidate/getAllFinalShortCand"
    );
    const json = await response.json();
    console.log("rowsData: ", json);
    setLoading(true);

    setTimeout(() => {
      setRowsData(json.getAllFinalShortCand);
      console.log("json.getAllCand: ", json.getAllFinalShortCand);
      setLoading(false);
    }, 1000);
  }

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
        SHORTLISTED CANDIDATES FOR JOB INTERVIEW
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

export default FinalShortlistedCandidates;
