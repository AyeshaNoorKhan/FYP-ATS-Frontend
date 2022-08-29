import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Axios from "axios";
import { useParams } from "react-router-dom";
import JobDetail from "./JobDetail";
import Apply from "./Apply";
import { Spinner } from "react-bootstrap";
import "../../App.css";

function JobDetailApply() {
  const [jobDetail, setJobDetail] = useState([]);
  const [positionApplied, setPositionApplied] = useState("");
  const [isLoading, setLoading] = useState(true);

  var { jobId } = useParams();
  useEffect(() => {
    Axios.get("https://atsbackend.herokuapp.com/api/job/getjob/" + jobId)
      .then((response) => {
        const jobDetailData = response.data.getAllJob[0];
        const posApplied = jobDetailData.job_title;
        setTimeout(() => {
          setJobDetail(jobDetailData);
          setPositionApplied(posApplied);
          setLoading(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  if (isLoading) {
    return (
      <div className="job-detail-list">
        <Spinner animation="border" className="loader" />
      </div>
    );
  } else {
    return (
      <div style={{ paddingTop: "2rem" }}>
        <Container>
          <div className="row">
            <Container className="col-12 col-md-8 mb-3">
              <JobDetail jobDetail={jobDetail} />
            </Container>
            <Container className="col-12 col-md-4 mb-3">
              {positionApplied.length ? (
                <Apply positionApplied={positionApplied} jobIDparam={jobId} />
              ) : null}
            </Container>
          </div>
        </Container>
      </div>
    );
  }
}

export default JobDetailApply;
