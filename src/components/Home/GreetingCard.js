import React from 'react';
import {Card,CardGroup} from 'react-bootstrap';
import '../../stylesheet/GreetCard.css';

function GreetingCard(props) {
    return (
        <div className='greetcard'>
            <CardGroup>
           <Card border="light" style={{ width: '18rem' }}>
    <Card.Header style={{backgroundColor:"rgb(204, 204, 204)"}}>Candidate Job Requests # 100</Card.Header>
    <Card.Body style={{ backgroundColor:"rgb(0, 51, 153)",color:"white"}}>
      {/* <Card.Title>Candidate Job Requests</Card.Title> */}
      <Card.Text>
      100 more candidate job requests
      </Card.Text>
    </Card.Body>
  </Card>
  <Card border="light" style={{ width: '18rem' }}>
    <Card.Header style={{backgroundColor:"rgb(204, 204, 204)"}}>Aptitude Test Results # 43</Card.Header>
    <Card.Body style={{ backgroundColor:"rgb(0, 51, 153)",color:"white"}}>
      {/* <Card.Title>Aptitude Test Results</Card.Title> */}
      <Card.Text>
      43 more aptitude test results
      </Card.Text>
    </Card.Body>
  </Card>
  <Card border="light" style={{ width: '18rem' }}>
    <Card.Header style={{backgroundColor:"rgb(204, 204, 204)"}}>Shortlisted Resumes # 25</Card.Header>
    <Card.Body style={{ backgroundColor:"rgb(0, 51, 153)",color:"white"}}>
      {/* <Card.Title>Shortlisted Resumes</Card.Title> */}
      <Card.Text>
      25 more shortlisted resumes
      </Card.Text>
    </Card.Body>
  </Card>
  </CardGroup>
        </div>
    );
}

export default GreetingCard;