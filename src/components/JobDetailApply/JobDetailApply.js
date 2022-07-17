import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Axios from 'axios';
import JobDetail from "./JobDetail";
import Apply from "./Apply";

function JobDetailApply() {

    useEffect(() => {
        // Axios.get
    }, [])

    return (
        <div>
        <Container>
        <div className="row">
            <Container className="col-12 col-sm-8">
                <JobDetail />
            </Container>
            <Container className="col-12 col-sm-4">
                <Apply />
            </Container>
            </div>
        </Container>
        </div>
    )
}

export default JobDetailApply