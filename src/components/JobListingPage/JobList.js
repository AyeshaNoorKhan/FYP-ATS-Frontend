import React, { useState, useEffect } from "react";
import Axios from "axios";
import Job from "./Job";
import SearchSort from "./SearchSort";
import { Spinner } from "react-bootstrap";
import "../../App.css";

// function JobList() {
function JobList() {
  const [joblist, setJobList] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get("https://atsbackend.herokuapp.com/api/job/getjobs")
      .then((response) => {
        const jobData = response.data.getAllJob;
        setTimeout(() => {
          setJobList(jobData);
          setFilteredJobs(jobData);
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
      <div className="joblist">
        <SearchSort
          joblist={joblist}
          filteredJobs={filteredJobs}
          setFilteredJobs={setFilteredJobs}
        />
        {filteredJobs.map((job, i) => (
          <Job key={i} job={job} />
        ))}
      </div>
    );
  }
}

export default JobList;
