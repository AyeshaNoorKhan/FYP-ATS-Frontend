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
                    <Container className="col-12 col-md-8 mb-3">
                        <JobDetail />
                    </Container>
                    <Container className="col-12 col-md-4 md-3">
                        <Apply />
                    </Container>
                </div>
            </Container>
        </div>
    )
}

export default JobDetailApply