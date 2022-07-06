import React, { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
// import "./TextEditor.css";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import "../../stylesheet/JobDetail.css";

function AddJobModal(props) {
  //   let history = useHistory();
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
  const ondescription = (value) => {
    setjobInfo({ ...jobInfo, job_description: value });
  };
  const onqualification = (value) => {
    setjobInfo({ ...jobInfo, job_qualification: value });
  };
  const onexperience = (value) => {
    setjobInfo({ ...jobInfo, job_experience: value });
  };
  const [isError, setError] = useState(null);
  const addNewJobDetails = async (event) => {
    try {
      event.preventDefault();
      event.persist();
      if (jobInfo.description.length < 50) {
        setError("Required, Add description minimum length 50 characters");
        return;
      }
      axios
        .post(`https://atsbackend.herokuapp.com/api/job/addjob`, {
          job_id: jobInfo.job_id,
          job_code: jobInfo.job_code,
          job_category: jobInfo.job_category,
          job_title: jobInfo.job_title,
          job_location: jobInfo.job_location,
          job_positions: jobInfo.job_positions,
          job_description: jobInfo.job_description,
          job_qualification: jobInfo.job_qualification,
          job_experience: jobInfo.job_experience,
        })
        .then((res) => {
          if (res.data.success === true) {
            // history.push("/");
            window.alert("Successfully Added New Job");
          }
        });
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="jobdetail">
        <div className="container">
          <div className="row">
            <form onSubmit={addNewJobDetails} className="update__forms">
              {/* <h3 className="myaccount-content"> Add </h3> */}
              <h4
                style={{
                  backgroundColor: "rgb(6, 89, 167)",
                  color: "white",
                  padding: "5px",
                }}
              >
                Add New Job
              </h4>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label className="font-weight-bold">
                    {" "}
                    Job ID <span className="required"> * </span>{" "}
                  </label>
                  <input
                    type="text"
                    name="job_id"
                    value={jobInfo.job_id || ""}
                    onChange={onChangeValue}
                    className="form-control"
                    placeholder=""
                    required
                  />
                  <label className="font-weight-bold">
                    {" "}
                    Job Code <span className="required"> * </span>{" "}
                  </label>
                  <input
                    type="text"
                    name="job_code"
                    value={jobInfo.job_code}
                    onChange={onChangeValue}
                    className="form-control"
                    placeholder=""
                    required
                  />
                  <label className="font-weight-bold">
                    {" "}
                    Job Category <span className="required"> * </span>{" "}
                  </label>
                  <input
                    type="text"
                    name="job_category"
                    value={jobInfo.job_category}
                    onChange={onChangeValue}
                    className="form-control"
                    placeholder=""
                    required
                  />
                  <br />
                  <label className="font-weight-bold">
                    {" "}
                    Job Title <span className="required"> * </span>{" "}
                  </label>
                  <input
                    type="text"
                    name="job_title"
                    value={jobInfo.job_title}
                    onChange={onChangeValue}
                    className="form-control"
                    placeholder=""
                    required
                  />

                  <label className="font-weight-bold">
                    {" "}
                    Job Location <span className="required"> * </span>{" "}
                  </label>
                  <input
                    type="text"
                    name="job_location"
                    value={jobInfo.job_location}
                    onChange={onChangeValue}
                    className="form-control"
                    placeholder=""
                    required
                  />
                  <br />
                  <label className="font-weight-bold">
                    {" "}
                    Job Position <span className="required"> * </span>{" "}
                  </label>
                  <input
                    type="text"
                    name="job_positions"
                    value={jobInfo.job_positions}
                    onChange={onChangeValue}
                    className="form-control"
                    placeholder=""
                    required
                  />
                  <br />
                </div>
                <div className="clearfix"></div>
                <div className="form-group col-md-12 editor">
                  <label className="font-weight-bold">
                    {" "}
                    Job Description <span className="required"> * </span>{" "}
                  </label>
                  <EditorToolbar toolbarId={"t1"} />
                  <ReactQuill
                    theme="snow"
                    value={jobInfo.description}
                    onChange={ondescription}
                    placeholder={"Mention job description"}
                    modules={modules("t1")}
                    formats={formats}
                  />
                </div>
                <br />
                <div className="form-group col-md-12 editor">
                  <label className="font-weight-bold">
                    {" "}
                    Job Qualification<span className="required"> * </span>{" "}
                  </label>
                  <EditorToolbar toolbarId={"t2"} />
                  <ReactQuill
                    theme="snow"
                    value={jobInfo.job_qualification}
                    onChange={onqualification}
                    placeholder={
                      "Mention qualification required for this job position"
                    }
                    modules={modules("t2")}
                    formats={formats}
                  >
                    <div className="my-editing-area" />
                  </ReactQuill>
                </div>
                <br />
                <div className="form-group col-md-12 editor">
                  <label className="font-weight-bold">
                    {" "}
                    Job Experience <span className="required"> * </span>{" "}
                  </label>
                  <EditorToolbar toolbarId={"t3"} />
                  <ReactQuill
                    theme="snow"
                    value={jobInfo.job_experience}
                    onChange={onexperience}
                    placeholder={
                      "Mention job experience required for this job position"
                    }
                    modules={modules("t3")}
                    formats={formats}
                  />
                </div>
                <br />
                {isError !== null && <div className="errors"> {isError} </div>}
                <div className="form-group col-sm-12 text-right">
                  <button type="submit" className="btn btn__theme">
                    {" "}
                    Submit{" "}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddJobModal;
