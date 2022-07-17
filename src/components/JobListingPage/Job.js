import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function Job({ job }) {

    const navigate = useNavigate();

    return (
        <div className='job'>
            <Card style={{ margin: "1em 0", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <Card.Body style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <Card.Title>{job.job_title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{job.job_location}</Card.Subtitle>
                    </div>
                    <Button style={{ alignSelf: "center", marginLeft: "16px" }} variant="secondary"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/jobdetail/${job.job_id}`);
                        }
                        }
                    >Apply</Button>
                </Card.Body>

            </Card>
        </div>
    )
}

export default Job