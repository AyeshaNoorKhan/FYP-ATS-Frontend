import React,{useState} from 'react';
import MaterialTable from 'material-table';
import {Button,Modal,Form,Row,Col} from 'react-bootstrap';
import {Link} from "react-router-dom";
import AddJobModal from './AddJobModal';


function JobDetail(props) {
    const[show,setShow]=useState(false);
    var columns = [
        {title: "Job ID", field: "job_id", hidden: true},
        {title: "Job Title", field: "Jtitle"},
        {title: "Job Category", field: "Jcat"},
        {title: "Job Description", field: "Jdesc"},
        {title: "Job Location", field: "Jloc"},
        {title: "Work Experience", field: "WExp"},
        {title: "Available Seats", field: "ASeats"}
        ]
    return (
        <div>

        <Link to="/jobdetails/addnewjob" style={{textDecoration:"none",color:"gray"}}>
            <Button style={{backgroundColor:"rgb(0, 51, 153)",color:"white"}} onClick={()=>setShow(true)}>
                Add New Job
            </Button>
        </Link>
            <MaterialTable
                title="Job Details"
                columns={columns}
                // icons={tableIcons}
                // data={data}
            />
            {show==true?
             <Modal show={show}>
             <Modal.Header >
               <Modal.Title>Add New Job</Modal.Title>
             </Modal.Header>
             <Modal.Body>
               <Form >
               <Row >
                   <Col ><Form.Text className="text-muted">Job ID</Form.Text></Col>
                   <Col><Form.Control size="sm" type="text" name="memberno" placeholder=""  /></Col>
               </Row>
               <Row >
                   <Col ><Form.Text className="text-muted">Job Title</Form.Text></Col>
                   <Col><Form.Control size="sm" type="text" name="name" placeholder=" " /></Col>
               </Row>
               <Row >
                   <Col ><Form.Text className="text-muted">Job Location</Form.Text></Col>
                   <Col><Form.Control size="sm" type="text" name="name" placeholder=" " /></Col>
               </Row>
               <Row >
                   <Col ><Form.Text className="text-muted">Job Category</Form.Text></Col>
                   <Col><Form.Control size="sm" type="text" name="name" placeholder=" " /></Col>
               </Row>
               <Row >
                   <Col ><Form.Text className="text-muted">Job Description</Form.Text></Col>
                   <Col><Form.Control size="sm" type="text" name="name" placeholder=" " /></Col>
               </Row>
               <Row >
                   <Col ><Form.Text className="text-muted">Job Positions</Form.Text></Col>
                   <Col><Form.Control size="sm" type="text" name="name" placeholder=" " /></Col>
               </Row>
               </Form>
             </Modal.Body>
             <Modal.Footer>
               <Button variant="danger" onClick={()=>setShow(false)}>
                 Close
               </Button>
               <Button style={{backgroundColor:"rgb(0, 51, 153)",color:"white"}} >
                 Add Job
               </Button>
             </Modal.Footer>
           </Modal>
            :""}
        </div>
    );
}

export default JobDetail;