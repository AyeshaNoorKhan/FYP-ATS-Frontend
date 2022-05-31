import React from 'react';

function Job({ job }) {
    return (
        <div className={'job'}>
            {job.job_title}
        </div>

    )
}

export default Job