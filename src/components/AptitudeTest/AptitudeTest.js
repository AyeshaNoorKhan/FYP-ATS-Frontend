import React,{useState} from 'react';
import MaterialTable from 'material-table';
import {Button,Modal,Form,Row,Col} from 'react-bootstrap';
import {Link} from "react-router-dom";

function AptitudeTest(props) {
    const[show,setShow]=useState(false);
    var columns = [
        {title: "Aptitude Test ID", field: "job_id", hidden: true},
        {title: "Selected Category", field: "Jtitle"},
        {title: "Question", field: "Jcat"},
        {title: "OptionA", field: "Jdesc"},
        {title: "OptionB", field: "Jloc"},
        {title: "OptionC", field: "WExp"},
        {title: "Answer", field: "ASeats"}
        ]
    return (
        <div>

            <Button style={{backgroundColor:"rgb(0, 51, 153)",color:"white"}} onClick={()=>setShow(true)}>
                Add New Aptitude Question
            </Button>
            <MaterialTable
                title="Aptitude Test Questions"
                columns={columns}
                // icons={tableIcons}
                // data={data}
            />
            {show==true?
             <Modal show={show}>
             <Modal.Header >
               <Modal.Title> Add New Aptitude Question</Modal.Title>
             </Modal.Header>
             <Modal.Body>
               <Form >
               <Row >
                   <Col ><Form.Text className="text-muted">Aptitude Test ID</Form.Text></Col>
                   <Col><Form.Control size="sm" type="text" name="memberno" placeholder=""  /></Col>
               </Row>
               <Row >
                   <Col ><Form.Text className="text-muted">Selected Category</Form.Text></Col>
                   <Col><Form.Control size="sm" type="text" name="name" placeholder=" " /></Col>
               </Row>
               <Row >
                   <Col ><Form.Text className="text-muted">Question</Form.Text></Col>
                   <Col><Form.Control size="sm" type="text" name="name" placeholder=" " /></Col>
               </Row>
               <Row >
                   <Col ><Form.Text className="text-muted">Options</Form.Text></Col>
               </Row>
               <Row >
                   <Col ><Form.Text className="text-muted">Option A</Form.Text></Col>
                   <Col><Form.Control size="sm" type="text" name="name" placeholder=" " /></Col>
               </Row>
               <Row >
                   <Col ><Form.Text className="text-muted">Option A</Form.Text></Col>
                   <Col><Form.Control size="sm" type="text" name="name" placeholder=" " /></Col>
               </Row>
               <Row >
                   <Col ><Form.Text className="text-muted">Option C</Form.Text></Col>
                   <Col><Form.Control size="sm" type="text" name="name" placeholder=" " /></Col>
               </Row>
               <Row >
                   <Col ><Form.Text className="text-muted">Correct Answer</Form.Text></Col>
                   <Col><Form.Control size="sm" type="text" name="name" placeholder=" " /></Col>
               </Row>
               </Form>
             </Modal.Body>
             <Modal.Footer>
               <Button variant="danger" onClick={()=>setShow(false)}>
                 Close
               </Button>
               <Button style={{backgroundColor:"rgb(0, 51, 153)",color:"white"}} >
                 Add Question
               </Button>
             </Modal.Footer>
           </Modal>
            :""}
        </div>
    );
}

export default AptitudeTest;