import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import JobList from './JobList';

function JobListingPage() {
    return (
        <div >
            <Container fluid>
            <Row>
                <Col></Col>
                <Col sm="10" md="8">
                        <JobList />
                </Col>
                <Col></Col>
                </Row>
            </Container>
        </div>
    )
}

export default JobListingPage