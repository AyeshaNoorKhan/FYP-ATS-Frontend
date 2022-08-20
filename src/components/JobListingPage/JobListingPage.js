import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import JobList from "./JobList";
import SearchSort from "./SearchSort";

function JobListingPage() {
  return (
    <div style={{ paddingTop: "2rem" }}>
      <Container fluid>
        <Row>
          <Col></Col>
          <Col sm="10" md="8">
            <Card.Header className="careersCardHeader">
              Current Openings
            </Card.Header>
            {/* <SearchSort /> */}
            <JobList />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}
export default JobListingPage;
