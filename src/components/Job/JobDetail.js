import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../stylesheet/JobDetail.css";
import ListGroup from "react-bootstrap/ListGroup";

function JobDetail(props) {
  const [rowsData, setRowsData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const deleteSpecificJob = (jobId) => {
    try {
      axios
        .delete(`https://atsbackend.herokuapp.com/api/job/deletejob/` + jobId)
        .then((res) => {
          if (res.status == 200) {
            alert("Job Deleted");
          } else {
            alert("Failed to delete the job");
          }
        });
    } catch (error) {
      alert(error);
    }
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
                  onClick={() => deleteSpecificJob(job.job_id)}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default JobDetail;
