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

export default function EditAptitude() {
  const [isLoading, setLoading] = useState(false);
  var { aptId } = useParams();
  const [quesEditorState, setQuesEditorState] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML("<div></div>"))
    )
  );

  const uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
      console.log(file);
      resolve({ data: { link: URL.createObjectURL(file) } });
    });
  };
  const [aptInfo, setaptInfo] = useState({
    aptTest_id: "",
    aptTest_category: "",
    aptTest_question: "",
    aptTest_optionA: "",
    aptTest_optionB: "",
    aptTest_optionC: "",
    aptTest_optionD: "",
    aptTest_answer: "",
  });

  const onChangeValue = (e) => {
    setaptInfo({
      ...aptInfo,
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

  const updateAptQues = async (event) => {
    try {
      alert("working");
      axios
        .post(
          `https://atsbackend.herokuapp.com/api/aptTest/updateaptques/` + aptId,
          {
            aptTest_id: aptInfo.aptTest_id,
            aptTest_category: aptInfo.aptTest_category,
            aptTest_question: draftToHtml(
              convertToRaw(quesEditorState.getCurrentContent())
            ),
            aptTest_optionA: aptInfo.aptTest_optionA,
            aptTest_optionB: aptInfo.aptTest_optionB,
            aptTest_optionC: aptInfo.aptTest_optionC,
            aptTest_optionD: aptInfo.aptTest_optionD,
            aptTest_answer: aptInfo.aptTest_answer,
          }
        )
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
        "https://atsbackend.herokuapp.com/api/aptTest/getapttest/" + aptId
      );
      const json = await response.json();
      setLoading(true);
      setTimeout(() => {
        setaptInfo(json.getaptques[0]);
        setQuesEditorState(
          htmlToDraftBlocks(json.getaptques[0].aptTest_question)
        );
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
                EDIT APTITUDE QUESTION
              </h5>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Text className="text-muted">Aptitude Test ID</Form.Text>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="aptTest_id" //change accordingly
                    value={aptInfo.aptTest_id} //change a/c to quesInfo
                    onChange={onChangeValue}
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Text className="text-muted">
                    Select Aptitude Test Category
                  </Form.Text>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="aptTest_category" //change accordingly
                    value={aptInfo.aptTest_category} //change a/c to quesInfo
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
                      options: [
                        "inline",
                        "list",
                        "blockType",
                        "image",
                        "history",
                      ],
                      blockType: {
                        inDropdown: false,
                        options: ["Normal", "Blockquote", "Code"],
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                      },
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
                      image: {
                        urlEnabled: true,
                        uploadEnabled: true,
                        uploadCallback: uploadImageCallBack,
                        className: undefined,
                        component: undefined,
                        popupClassName: undefined,
                        alignmentEnabled: true,
                        previewImage: true,
                        inputAccept:
                          "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                        alt: { present: false, mandatory: false },
                        defaultSize: {
                          height: "auto",
                          width: "auto",
                        },
                      },
                    }}
                    onEditorStateChange={onQuestion}
                  />
                </div>
              </Row>
              <br />

              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Text className="text-muted">Option A</Form.Text>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="aptTest_optionA"
                    value={aptInfo.aptTest_optionA}
                    onChange={onChangeValue}
                    placeholder=" "
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Text className="text-muted">Option B</Form.Text>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="aptTest_optionB"
                    value={aptInfo.aptTest_optionB}
                    onChange={onChangeValue}
                    placeholder=" "
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                {/* <Form.Text className="text-muted">Options</Form.Text> */}
                <Form.Group as={Col}>
                  <Form.Text className="text-muted">Option C</Form.Text>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="aptTest_optionC"
                    value={aptInfo.aptTest_optionC}
                    onChange={onChangeValue}
                    placeholder=" "
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Text className="text-muted">Option D</Form.Text>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="aptTest_optionD"
                    value={aptInfo.aptTest_optionD}
                    onChange={onChangeValue}
                    placeholder=" "
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                {/* <Form.Text className="text-muted">Options</Form.Text> */}
                <Form.Group as={Col}>
                  <Form.Text className="text-muted">Answer</Form.Text>
                  <Form.Control
                    size="sm"
                    type="text"
                    name="aptTest_answer"
                    value={aptInfo.aptTest_answer}
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
                  onClick={updateAptQues}
                >
                  {" "}
                  Edit Aptitude Question{" "}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <Modal
        contentClassName="modalSuccess"
        style={{ color: "#0f5132" }}
        show={showSuccess}
        onHide={handleSuccessClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Successfully Updates Test Question</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSuccessClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        contentClassName="modalFailure"
        show={showFailure}
        onHide={handleFailureClose}
        backdrop="static"
        keyboard={false}
        centered
      >
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

      <Modal
        contentClassName="modalFailure"
        show={showError}
        onHide={handleErrorClose}
        backdrop="static"
        keyboard={false}
        centered
      >
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
