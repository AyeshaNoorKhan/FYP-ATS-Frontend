import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";

function JobDetail() {

    const [jobDetail, setJobDetail] = useState([]);
    var { jobId } = useParams();
    useEffect(() => {
        Axios.get("https://atsbackend.herokuapp.com/api/job/getjob/" + jobId)
            .then((response) => {
                const jobDetailData = response.data.getAllJob[0];
                setJobDetail(jobDetailData);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            })

    }, [])

    return (
        <div>
            <Card style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <Card.Header className="applyPageCardHeader">Job Details</Card.Header>
                <Card.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
                    <h6>Job ID: {jobDetail.job_id}</h6>
                    <h6>Job Code: {jobDetail.job_code}</h6>
                    <h6>Job Category: {jobDetail.job_category}</h6>
                    <h6>Job Title: {jobDetail.job_title}</h6>
                    <h6>Job Location: {jobDetail.job_location}</h6>
                    <h6>Job Number of Position(s): {jobDetail.job_positions}</h6>
                    <h6>Job Description:</h6>
                    <div
                        className="post__description"
                        dangerouslySetInnerHTML={{ __html: jobDetail.job_description }}
                    />
                    <h6>Job Qualification:</h6>
                    <div
                        className="post__description"
                        dangerouslySetInnerHTML={{ __html: jobDetail.job_qualification }}
                    />
                    <h6>Job Experience:</h6>
                    <div
                        className="post__description"
                        dangerouslySetInnerHTML={{ __html: jobDetail.job_experience }}
                    />
                

            </Card.Body>
        </Card>

        </div >
    )
}

export default JobDetail