import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../stylesheet/JobDetail.css";
import "../../stylesheet/Modal.css"
import ListGroup from "react-bootstrap/ListGroup";

function JobDetail(props) {
  const [rowsData, setRowsData] = useState([]);
  const [isLoading, setLoading] = useState(false);

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

  const [id, setId] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const handleConfirmShow = (id) => {
    setId(id);
    console.log(id);
    setShowConfirm(true);
  }
  const handleConfirmClose = () => setShowConfirm(false);


  const deleteSpecificJob = (jobId) => {
    handleConfirmClose();
    try {
      axios
        .delete(`https://atsbackend.herokuapp.com/api/job/deletejob/` + jobId)
        .then((res) => {
          console.log(res)
          if (res.status == 200) {
            handleSuccessShow();
          } else {
            handleFailureShow();
          }
        });
    } catch (error) {
      handleErrorShow();
      setModalError(error);
    }

    // }
  };
  useEffect(() => {
    async function FetchAPI() {
      const response = await fetch(
        "https://atsbackend.herokuapp.com/api/job/getjobs"
      );
      const json = await response.json();
      setLoading(true);
      setTimeout(() => {
        setRowsData(json.getAllJob);
        console.log(json.getAllJob);
        setLoading(false);
      }, 1500);
    }
    FetchAPI();
  }, [rowsData]);

  return (
    <div className="job-detail-list">
      <Link
        to="/jobdetails/addnewjob"
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
          Add New Job{" "}
        </Button>
      </Link>

      <p></p>

      {/* <GridTable
        columns={getColumns({ setRowsData })}
        rows={rowsData}
        isLoading={isLoading}
        onRowClick={({ rowIndex, data, column, isEdit, event }, tableManager) =>
          !isEdit &&
          tableManager.rowSelectionApi.getIsRowSelectable(data.id) &&
          tableManager.rowSelectionApi.toggleRowSelection(data.id)
        }
      /> */}
      <ListGroup>
        <h5
          style={{
            backgroundColor: "rgb(6, 89, 167)",
            color: "white",
            padding: "7px",
          }}
        >
          JOBS
        </h5>
        {rowsData.map((job, index) => (
          <ListGroup.Item key={index}>
            <div className="list-left">
              <h6>Job ID: {job.job_id}</h6>
              <h6>Job Code: {job.job_code}</h6>
              <h6>Job Category: {job.job_category}</h6>
              <h6>Job Title: {job.job_title}</h6>
            </div>
            <div className="list-right">
              <ButtonGroup aria-label="Basic example">
                <Link
                  to={"/jobdetails/getjob/" + job.job_id}
                  style={{
                    textDecoration: "none",
                    color: "gray",
                    borderRadius: "none",
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: "rgb(6, 89, 167)",
                      color: "white",
                      border: "none",
                      borderRadius: "1px",
                    }}
                  >
                    View
                  </Button>
                </Link>
                <Link
                  to={"/jobdetails/updatejob/" + job.job_id}
                  style={{
                    textDecoration: "none",
                    color: "gray",
                    borderRadius: "none",
                  }}
                >
                  <Button
                    variant="success"
                    style={{
                      border: "none",
                      borderRadius: "1px",
                    }}
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  style={{
                    border: "none",
                    borderRadius: "1px",
                  }}
                  onClick={() => handleConfirmShow(job.job_id)}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal contentClassName="modalSuccess" style={{ color: "#0f5132" }} show={showSuccess} onHide={handleSuccessClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Job Deleted</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSuccessClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal contentClassName="modalFailure" show={showFailure} onHide={handleFailureClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Failure</Modal.Title>
        </Modal.Header>
        <Modal.Body>Failed to delete the job</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleFailureClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal contentClassName="modalFailure" show={showError} onHide={handleErrorClose} backdrop="static" keyboard={false} centered>
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

      <Modal contentClassName="modalConfirm" show={showConfirm} onHide={handleConfirmClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this job?</Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="secondary" onClick={handleConfirmClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deleteSpecificJob(id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default JobDetail;
