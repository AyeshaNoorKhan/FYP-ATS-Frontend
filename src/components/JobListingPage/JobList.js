import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Job from './Job';


function JobList() {
    const [joblist, setJobList] = useState([]);

    useEffect(() => {
        Axios.get("https://vazeema-siddiqui.github.io/JSON-for-FYP/dummyjobs.json")
            .then((response) => {
                setJobList(() => response.data);
            })

    }, [])

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