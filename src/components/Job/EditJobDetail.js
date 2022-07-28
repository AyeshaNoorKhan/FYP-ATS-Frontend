import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../stylesheet/JobDetail.css";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function EditJobDetail() {
  const [rowsData, setRowsData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  var { jobId } = useParams();
  const [descEditorState, setDescEditorState] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML("<div></div>"))
    )
  );
  const [quaEditorState, setQuaEditorState] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML("<div></div>"))
    )
  );
  const [expEditorState, setExpEditorState] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML("<div></div>"))
    )
  );
  var { jobId } = useParams();
  const [jobInfo, setjobInfo] = useState({
    job_id: "",
    job_code: "",
    job_category: "",
    job_title: "",
    job_location: "",
    job_positions: "",
    job_description: "",
    job_qualification: "",
    job_experience: "",
  });
  const onChangeValue = (e) => {
    console.log("value", e.target.value);

    setjobInfo({
      ...jobInfo,
      [e.target.name]: e.target.value,
    });
  };

  const ondescription = (descEditorState) => {
    setDescEditorState(descEditorState);
  };

  const onqualification = (quaEditorState) => {
    setQuaEditorState(quaEditorState);
  };
  const onexperience = (expEditorState) => {
    setExpEditorState(expEditorState);
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
      let myobj = {
        job_id: jobInfo.job_id,
        job_code: jobInfo.job_code,
        job_category: jobInfo.job_category,
        job_title: jobInfo.job_title,
        job_location: jobInfo.job_location,
        job_positions: jobInfo.job_positions,
        job_description: draftToHtml(
          convertToRaw(descEditorState.getCurrentContent())
        ),
        job_qualification: draftToHtml(
          convertToRaw(quaEditorState.getCurrentContent())
        ),
        job_experience: draftToHtml(
          convertToRaw(expEditorState.getCurrentContent())
        ),
      };
      console.log("myobj: ", myobj);
      axios
        .put(`https://atsbackend.herokuapp.com/api/job/updatejob/` + jobId, {
          job_id: jobInfo.job_id,
          job_code: jobInfo.job_code,
          job_category: jobInfo.job_category,
          job_title: jobInfo.job_title,
          job_location: jobInfo.job_location,
          job_positions: jobInfo.job_positions,
          job_description: draftToHtml(
            convertToRaw(descEditorState.getCurrentContent())
          ),
          job_qualification: draftToHtml(
            convertToRaw(quaEditorState.getCurrentContent())
          ),
          job_experience: draftToHtml(
            convertToRaw(expEditorState.getCurrentContent())
          ),
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
  const htmlToDraftBlocks = (html) => {
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  };
  useEffect(() => {
    async function FetchAPI() {
      const response = await fetch(
        "https://atsbackend.herokuapp.com/api/job/getjob/" + jobId
      );
      const json = await response.json();
      setLoading(true);
      setTimeout(() => {
        setjobInfo(json.getAllJob[0]);
        setDescEditorState(
          htmlToDraftBlocks(json.getAllJob[0].job_description)
        );
        setQuaEditorState(
          htmlToDraftBlocks(json.getAllJob[0].job_qualification)
        );
        setExpEditorState(htmlToDraftBlocks(json.getAllJob[0].job_experience));
        console.log("descEditorState:", descEditorState);
        console.log("json.getAllJob[0]: ", json.getAllJob[0]);
        console.log("jobInfo", jobInfo);
        setLoading(false);
      }, 1500);
    }
    FetchAPI();
  }, []);
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
                EDIT JOB DETAIL
              </h5>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Text className="text-muted">Job ID</Form.Text>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="job_id"
                    value={jobInfo.job_id}
                    onChange={onChangeValue}
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Text className="text-muted">Job Code</Form.Text>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="job_code"
                    value={jobInfo.job_code}
                    onChange={onChangeValue}
                    placeholder=""
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Text className="text-muted">Job Category</Form.Text>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="job_category"
                    value={jobInfo.job_category}
                    onChange={onChangeValue}
                    placeholder=" "
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Text className="text-muted">Job Title</Form.Text>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="job_title"
                    value={jobInfo.job_title}
                    onChange={onChangeValue}
                    placeholder=" "
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Text className="text-muted">Job Location</Form.Text>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="job_location"
                    value={jobInfo.job_location}
                    onChange={onChangeValue}
                    placeholder=" "
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Text className="text-muted">Job Positions</Form.Text>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="job_positions"
                    value={jobInfo.job_positions}
                    onChange={onChangeValue}
                    placeholder=" "
                  />
                </Form.Group>
              </Row>
              <div className="clearfix"></div>

              <div className="form-group col-md-12 editor">
                <Form.Text className="text-muted">Job Description</Form.Text>
                <br />
                <Editor
                  editorState={descEditorState}
                  editorStyle={{
                    border: "1px solid rgb(201, 203, 204)",
                    borderRadius: "3px",
                  }}
                  toolbar={{
                    options: ["inline", "list", "history"],
                    inline: {
                      inDropdown: false,
                      options: [
                        "bold",
                        "italic",
                        "underline",
                        "strikethrough",
                        "monospace",
                      ],
                    },
                    list: {
                      options: ["unordered", "ordered"],
                    },
                    fontSize: {
                      options: [8],
                    },
                  }}
                  onEditorStateChange={ondescription}
                />
              </div>
              <br />
              <div className="form-group col-md-12 editor">
                <Form.Text className="text-muted">Job Qualification</Form.Text>
                <br />
                <Editor
                  editorState={quaEditorState}
                  editorStyle={{
                    border: "1px solid rgb(201, 203, 204)",
                    borderRadius: "3px",
                  }}
                  toolbar={{
                    options: ["inline", "list", "history"],
                    inline: {
                      inDropdown: false,
                      options: [
                        "bold",
                        "italic",
                        "underline",
                        "strikethrough",
                        "monospace",
                      ],
                    },
                    list: {
                      options: ["unordered", "ordered"],
                    },
                  }}
                  onEditorStateChange={onqualification}
                />
              </div>
              <br />
              <div className="form-group col-md-12 editor">
                <Form.Text className="text-muted">Job Experience</Form.Text>
                <br />
                <Editor
                  editorState={expEditorState}
                  editorStyle={{
                    border: "1px solid rgb(201, 203, 204)",
                    borderRadius: "3px",
                  }}
                  toolbar={{
                    options: ["inline", "list", "history"],
                    inline: {
                      inDropdown: false,
                      options: [
                        "bold",
                        "italic",
                        "underline",
                        "strikethrough",
                        "monospace",
                      ],
                    },
                    list: {
                      options: ["unordered", "ordered"],
                    },
                  }}
                  onEditorStateChange={onexperience}
                />
              </div>
              <br />
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
                  Edit Job{" "}
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
        <Modal.Body>Successfully Edited the Job</Modal.Body>
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
        <Modal.Body>Failed to Edit the Job</Modal.Body>
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
