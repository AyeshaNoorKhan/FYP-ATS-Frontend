import React from 'react';
import Job from './Job';


function JobList({ joblist }) {
    return (
        <div className="joblist">
            {
                joblist.map(
                    job => <Job job={job} />
                )
            }
            

        </div>
    )
}

export default JobList