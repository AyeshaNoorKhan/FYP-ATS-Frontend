import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../../stylesheet/JobDetail.css";
import ListGroup from "react-bootstrap/ListGroup";

export default function SpecificJobDetail() {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  var { jobId } = useParams();
  console.log("jobId: ", jobId);
  useEffect(() => {
    async function FetchAPI() {
      const response = await fetch(
        "https://atsbackend.herokuapp.com/api/job/getjob/" + jobId
      );
      const json = await response.json();
      setLoading(true);
      setTimeout(() => {
        setApiData(json.getAllJob[0]);
        console.log(json.getAllJob[0]);
        setLoading(false);
      }, 1500);
    }
    FetchAPI();
  }, []);

  return (
    <div className="job-detail-list">
      <h5
        style={{
          backgroundColor: "rgb(6, 89, 167)",
          color: "white",
          padding: "7px",
        }}
      >
        JOB DETAIL VIEW:
      </h5>
      <ListGroup>
        <ListGroup.Item>
          <div className="list-left">
            <h6>Job ID: {apiData.job_id}</h6>
            <h6>Job Code: {apiData.job_code}</h6>
            <h6>Job Category: {apiData.job_category}</h6>
            <h6>Job Title: {apiData.job_title}</h6>
            <h6>Job Location: {apiData.job_location}</h6>
            <h6>Job Number of Position(s): {apiData.job_positions}</h6>
            <h6>Job Description:</h6>
            <div
              className="post__description"
              dangerouslySetInnerHTML={{ __html: apiData.job_description }}
            />
            <h6>Job Qualification:</h6>
            <div
              className="post__description"
              dangerouslySetInnerHTML={{ __html: apiData.job_qualification }}
            />
            <h6>Job Experience:</h6>
            <div
              className="post__description"
              dangerouslySetInnerHTML={{ __html: apiData.job_experience }}
            />
          </div>
          <div className="list-right">
            <ButtonGroup aria-label="Basic example">
              <Button variant="success">Edit</Button>
              <Button variant="danger">Delete</Button>
            </ButtonGroup>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
