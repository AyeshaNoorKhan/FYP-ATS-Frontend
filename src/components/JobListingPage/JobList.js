import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Job from './Job';


function JobList() {
    const [joblist, setJobList] = useState([]);

    useEffect(() => {
        Axios.get("https://atsbackend.herokuapp.com/api/job/getjobs")
            .then((response) => {
                const jobData = response.data.getAllJob;
                setJobList(jobData);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            })

    }, [joblist])

    return (
        <div className="joblist">
            {
                joblist.map((job, i) =>
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