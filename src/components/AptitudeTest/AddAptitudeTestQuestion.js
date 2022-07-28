import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import "../../stylesheet/JobDetail.css";
import "../../stylesheet/Modal.css"
import {
    EditorState,
    convertToRaw,
    ContentState,
    convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function AddJobModal(props) {
    const [quesEditorState, setQuesEditorState] = useState(() =>
        EditorState.createWithContent(
            ContentState.createFromBlockArray(convertFromHTML("<div></div>"))
        )
    );

    const uploadImageCallBack = (file) => {
        return new Promise(
          (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.imgur.com/3/image');
            xhr.setRequestHeader('Authorization', 'Client-ID ##clientid##');
            const data = new FormData();
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
              const response = JSON.parse(xhr.responseText);
              console.log(response)
              resolve(response);
            });
            xhr.addEventListener('error', () => {
              const error = JSON.parse(xhr.responseText);
              console.log(error)
              reject(error);
            });
          }
        );
      }

    const [quesInfo, setQuesInfo] = useState({
        // job_id: "",
        // job_code: "",
        // job_category: "",
        // job_title: "",
        // job_location: "",
        // job_positions: "",
        // job_description: "",
        // job_qualification: "",
        // job_experience: "",
    });
    const onChangeValue = (e) => {
        console.log("value", e.target.value);

        setQuesInfo({
            ...quesInfo,
            [e.target.name]: e.target.value,
        });
    };

    const onQuestion = (quesEditorState) => {
        setQuesEditorState(quesEditorState);
    };

    const [isError, setError] = useState(null);

    const [showSuccess, setShowSuccess] = useState(false);
    const handleSuccessShow = () => setShowSuccess(true);
    const handleSuccessClose = () => setShowSuccess(false);

    const [showFailure, setShowFailure] = useState(false);
    const handleFailureShow = () => setShowFailure(true);
    const handleFailureClose = () => setShowFailure(false);

    const [showError, setShowError] = useState(false);
    const handleErrorShow = () => setShowError(true);
    const handleErrorClose = () => setShowError(false);

    const [modalError, setModalError] = useState("");

    const addNewJobDetails = async (event) => {
        try {
            axios
                .post(`url`, {
                    //   job_id: jobInfo.job_id,
                    //   job_code: jobInfo.job_code,
                    //   job_category: jobInfo.job_category,
                    //   job_title: jobInfo.job_title,
                    //   job_location: jobInfo.job_location,
                    //   job_positions: jobInfo.job_positions,
                    //   job_description: draftToHtml(
                    //     convertToRaw(descEditorState.getCurrentContent())
                    //   ),
                })
                .then((res) => {
                    if (res.status == 200) {
                        handleSuccessShow();
                    } else {
                        handleFailureShow();
                    }
                });
        } catch (error) {
            handleErrorShow();
            setModalError(error);
        }
    };

    return (
        <>
            <div className="jobdetail_modal">
                <div className="container">
                    <div className="row">
                        <Form className="update__forms">
                            <h5
                                style={{
                                    backgroundColor: "rgb(6, 89, 167)",
                                    color: "white",
                                    padding: "7px",
                                }}
                            >
                                ADD NEW APTITUDE QUESTION
                            </h5>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Text className="text-muted">Aptitude Test ID</Form.Text>
                                    <Form.Control
                                        size="sm"
                                        type="text"
                                        name="job_id" //change accordingly
                                        value={quesInfo.job_id} //change a/c to quesInfo
                                        onChange={onChangeValue}
                                        placeholder=""
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Text className="text-muted">Selected Category</Form.Text>
                                    <Form.Control
                                        size="sm"
                                        type="text"
                                        name="job_code" //change accordingly
                                        value={quesInfo.job_code} //change a/c to quesInfo
                                        onChange={onChangeValue}
                                        placeholder=""
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <div className="form-group col-md-12 editor">
                                    <Form.Text className="text-muted">Question</Form.Text>
                                    <br />
                                    <Editor
                                        editorState={quesEditorState}
                                        editorStyle={{
                                            border: "1px solid rgb(201, 203, 204)",
                                            borderRadius: "3px",
                                        }}
                                        toolbar={{
                                            options: ["image", "history"],
                                            image: {
                                                urlEnabled: true,
                                                uploadEnabled: true,
                                                uploadCallback: uploadImageCallBack,
                                            },
                                        }}
                                        onEditorStateChange={onQuestion}
                                    />
                                </div>
                            </Row>
                            <br />

                            <Row className="mb-3">
                                <Form.Text className="text-muted">Options</Form.Text>
                                <Form.Group as={Col}>
                                    <Form.Text className="text-muted">Option A</Form.Text>
                                    <Form.Control
                                        size="sm"
                                        type="text"
                                        name="job_category"
                                        value={quesInfo.job_category}
                                        onChange={onChangeValue}
                                        placeholder=" "
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Text className="text-muted">Option B</Form.Text>
                                    <Form.Control
                                        size="sm"
                                        type="text"
                                        name="job_title"
                                        value={quesInfo.job_title}
                                        onChange={onChangeValue}
                                        placeholder=" "
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Text className="text-muted">Option C</Form.Text>
                                    <Form.Control
                                        size="sm"
                                        type="text"
                                        name="job_title"
                                        value={quesInfo.job_title}
                                        onChange={onChangeValue}
                                        placeholder=" "
                                    />
                                </Form.Group>
                            </Row>

                            <div className="clearfix"></div>



                            {isError !== null && <div className="errors"> {isError} </div>}
                            <div className="form-group col-sm-12 text-right">
                                <Button
                                    style={{
                                        backgroundColor: "rgb(6, 89, 167)",
                                        color: "white",
                                        border: "none",
                                    }}
                                    onClick={addNewJobDetails}
                                >
                                    {" "}
                                    Add Question{" "}
                                </Button>
                            </div>

                        </Form>
                    </div>
                </div>
            </div>

            <Modal contentClassName="modalSuccess" style={{ color: "#0f5132" }} show={showSuccess} onHide={handleSuccessClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Successfully added new Test Question</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleSuccessClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal contentClassName="modalFailure" show={showFailure} onHide={handleFailureClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Failure</Modal.Title>
                </Modal.Header>
                <Modal.Body>Failed to add new Test Question</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleFailureClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal contentClassName="modalFailure" show={showError} onHide={handleErrorClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalError}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleErrorClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddJobModal;
