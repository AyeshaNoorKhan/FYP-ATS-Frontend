import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import "../../stylesheet/JobDetail.css";
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
  const addNewJobDetails = async (event) => {
    try {
      //   event.preventDefault();
      //   event.persist();
      //   if (jobInfo.description.length < 50) {
      //     setError("Required, Add description minimum length 50 characters");
      //     return;
      //   }
      axios
        .post(`https://atsbackend.herokuapp.com/api/job/addjob`, {
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
            alert("Successfully Created New Job");
          } else {
            alert("Failed to create new Job");
          }
        });
    } catch (error) {
      alert(error);
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
                ADD NEW JOB
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
                <Form.Text className="text-muted">Job Decscription</Form.Text>
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
                  Add Job{" "}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddJobModal;
