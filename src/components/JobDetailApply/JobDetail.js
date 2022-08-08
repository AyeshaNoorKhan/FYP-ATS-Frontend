import { Card } from "react-bootstrap";

function JobDetail({ jobDetail }) {
    return (
        <div>
            <Card style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <Card.Header className="careersCardHeader">Job Details</Card.Header>
                <Card.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
                    {/* <h6>Job ID: {jobDetail.job_id}</h6>
                    <h6>Job Code: {jobDetail.job_code}</h6> */}
                    <Card.Title><b>{jobDetail.job_title}</b></Card.Title>
                    {/* <h6>Job Category: {jobDetail.job_category}</h6>
                    <h6>Job Location: {jobDetail.job_location}</h6>
                    <h6>Number of Position(s): {jobDetail.job_positions}</h6>
                    <div></div> */}
                    <div className='small mb-3'>
                        <div className="row">
                            {/* <div className="col-lg-3 col-md-3 col-sm-4 col-sm-6"> */}
                            <div className="col-lg-3 col-sm-4">
                                <b>Job Category:</b>
                            </div>
                            {/* <div className="col-lg-7 col-md-7 col-sm-8 col-sm-6"> */}
                            <div className="col-lg-7 col-sm-6">
                                &nbsp;&nbsp;&nbsp;&nbsp;{jobDetail.job_category}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-sm-4">
                                <b>Job Location:</b>
                            </div>
                            <div className="col-lg-7 col-sm-6">
                                &nbsp;&nbsp;&nbsp;&nbsp;{jobDetail.job_location}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-sm-4">
                                <b>No. of Position(s)</b>
                            </div>
                            <div className="col-lg-7 col-sm-6">
                                &nbsp;&nbsp;&nbsp;&nbsp;{jobDetail.job_positions}
                            </div>
                        </div>
                    </div>

                    <h6><b>Job Description:</b></h6>
                    <div
                        className="post__description"
                        dangerouslySetInnerHTML={{ __html: jobDetail.job_description }}
                    />
                    <h6><b>Job Qualification:</b></h6>
                    <div
                        className="post__description"
                        dangerouslySetInnerHTML={{ __html: jobDetail.job_qualification }}
                    />
                    <h6><b>Job Experience:</b></h6>
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