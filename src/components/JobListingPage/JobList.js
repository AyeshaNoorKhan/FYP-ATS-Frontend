import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Job from './Job';
import SearchSort from './SearchSort';


// function JobList() {
function JobList() {
    const [joblist, setJobList] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        Axios.get("https://atsbackend.herokuapp.com/api/job/getjobs")
            .then((response) => {
                const jobData = response.data.getAllJob;
                setJobList(jobData);
                setFilteredJobs(jobData);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            })

    }, [])

    return (
        <div className="joblist"><SearchSort joblist={joblist} filteredJobs={filteredJobs} setFilteredJobs={setFilteredJobs} />
            {
                filteredJobs.map((job, i) =>
                    <Job
                        key={i}
                        job={job}
                    />
                )
            }
        </div>
    )
}

export default JobList