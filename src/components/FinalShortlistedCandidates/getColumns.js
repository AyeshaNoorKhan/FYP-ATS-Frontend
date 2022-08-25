import React, { useState } from "react";
import axios from "axios";
import { IoMail } from "react-icons/io5";
import { RiUserSearchFill } from "react-icons/ri";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
init("user_ctTO3wf4auf2drAPyOGXb");

const EDIT_SVG = (
  <svg
    height="20"
    viewBox="0 0 20 20"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="#fff" stroke="#1856bf" transform="translate(2 2)">
      <path
        d="m8.24920737-.79402796c1.17157287 0 2.12132033.94974747 2.12132033 2.12132034v13.43502882l-2.12132033 3.5355339-2.08147546-3.495689-.03442539-13.47488064c-.00298547-1.16857977.94191541-2.11832105 2.11049518-2.12130651.00180188-.00000461.00360378-.00000691.00540567-.00000691z"
        transform="matrix(.70710678 .70710678 -.70710678 .70710678 8.605553 -3.271644)"
      />
      <path d="m13.5 4.5 1 1" />
    </g>
  </svg>
);
const CANCEL_SVG = (
  <svg
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" stroke="#dc1e1e" transform="translate(5 5)">
      <path d="m.5 10.5 10-10" />
      <path d="m10.5 10.5-10-10z" />
    </g>
  </svg>
);
const SAVE_SVG = (
  <svg
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m.5 5.5 3 3 8.028-8"
      fill="none"
      stroke="#4caf50"
      transform="translate(5 6)"
    />
  </svg>
);

const styles = {
  select: { margin: "0 20px" },
  buttonsCellContainer: {
    padding: "0 20px",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  editButton: {
    background: "rgb(6, 89, 167)",
    outline: "none",
    cursor: "pointer",
    padding: 9,
    marginRight: "1px",
    display: "inline-flex",
    border: "none",
    borderRadius: "0%",
    boxShadow: "1px 1px 2px 0px rgb(0 0 0 / .3)",
  },
  buttonsCellEditorContainer: {
    height: "100%",
    width: "100%",
    display: "inline-flex",
    padding: "0 20px",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cancelButton: {
    background: "#f3f3f3",
    outline: "none",
    cursor: "pointer",
    marginRight: 10,
    padding: 2,
    display: "inline-flex",
    border: "none",
    borderRadius: "50%",
    boxShadow: "1px 1px 2px 0px rgb(0 0 0 / .3)",
  },
  saveButton: {
    background: "rgb(6, 89, 167)",
    outline: "none",
    cursor: "pointer",
    padding: 4,
    display: "inline-flex",
    border: "none",
    borderRadius: "0%",
    margin: "1rem",
    // boxShadow: "1px 1px 2px 0px rgb(0 0 0 / .3)",
  },
};

const getColumns = ({ setRowsData }) => {
  return [
    {
      id: "checkbox",
      visible: true,
      pinned: true,
      width: "54px",
    },
    {
      id: "2",
      field: "shortlisted_cand_Id",
      label: "Shortlisted Resume ID",
    },
    {
      id: "3",
      field: "cand_id",
      label: "Candidate ID",
      cellRenderer: ({ data }) => {
        return (
          <div>
            <button
              style={styles.saveButton}
              title={"View Candidate Information"}
            >
              <RiUserSearchFill style={{ color: "white" }} />
            </button>{" "}
            {data.cand_id}{" "}
          </div>
        );
      },
    },
    {
      id: "4",
      field: "job_id",
      label: "Job ID",
    },
    {
      id: "5",
      field: "total_score",
      label: "Aptitude Score",
    },
    {
      id: "6",
      field: "resume_rank",
      label: "Resume Rank",
    },
    {
      id: "7",
      field: "final_interview_link_status",
      label: "Onsite Interview",
    },
    {
      id: "buttons",
      width: "max-content",
      pinned: true,
      sortable: false,
      resizable: false,
      cellRenderer: ({
        tableManager,
        value,
        data,
        column,
        colIndex,
        rowIndex,
      }) => {
        const updateFinalInterviewStatus = (jobId, candId, emailStatus) => {
          axios
            .put(
              "https://atsbackend.herokuapp.com/api/shortlistcandidate/updateFinalInterviewStatus/" +
                jobId +
                "/" +
                candId,
              {
                final_interview_link_status: emailStatus,
              }
            )
            .then((res) => {
              if (res.status == 200) {
                alert("Candidate Final Interview Status Updated");
                window.location.reload();
              } else {
                alert("Failed to Update Final Interview Status");
              }
            });
        };
        const sendRejectionEmail = async () => {
          const response = await fetch(
            "https://atsbackend.herokuapp.com/api/candinfo/getcandinfo/" +
              data.cand_id
          );
          const json = await response.json();
          var apiData = json.getCand[0];

          if (apiData) {
            let templateParams = {
              cand_name: apiData.cand_name,
              cand_email: apiData.cand_email,
              HR_email: "khan4100339@cloud.neduet.edu.pk",
              Text_one:
                "but, you have been unsuccessful in moving on to the next stage of recruiting.",
              Text_two:
                "We will keep your resume on file and may contact you about future opportunities that fit your qualifications, skills, and experience. We strongly encourage you to pursue other possibilities with us in the future.",
              Text_three:
                "We wish you the best of luck with your career search.",
            };
            emailjs
              .send(
                "gmail",
                "template_18xl4pn",
                templateParams,
                "user_ctTO3wf4auf2drAPyOGXb"
              )
              .then(
                (response) => {
                  alert(
                    "Successfully Sent Rejection Interview Email to ",
                    apiData.cand_name
                  );
                  updateFinalInterviewStatus(
                    apiData.job_id,
                    apiData.cand_id,
                    "Rejected"
                  );
                },
                (err) => {
                  alert("Failed to Send Rejection Interview Email");
                }
              );
          }
        };
        const sendSelectionEmail = async () => {
          const response = await fetch(
            "https://atsbackend.herokuapp.com/api/candinfo/getcandinfo/" +
              data.cand_id
          );
          const json = await response.json();
          var apiData = json.getCand[0];

          if (apiData) {
            let templateParams = {
              cand_name: apiData.cand_name,
              cand_email: apiData.cand_email,
              HR_email: "khan4100339@cloud.neduet.edu.pk",
              Text_one:
                "and we are glad to inform you that you have been successful in moving on to the next stage of recruiting.",
              Text_two:
                "We will be going to contact you shortly for further recruitment process.",
              Text_three:
                "We wish you the best of luck for further recruitment process and looking forward to contact with you.",
            };
            emailjs
              .send(
                "gmail",
                "template_18xl4pn",
                templateParams,
                "user_ctTO3wf4auf2drAPyOGXb"
              )
              .then(
                (response) => {
                  alert(
                    "Successfully Sent Selection Interview Email to ",
                    apiData.cand_name
                  );
                  updateFinalInterviewStatus(
                    apiData.job_id,
                    apiData.cand_id,
                    "Selected"
                  );
                },
                (err) => {
                  alert("Failed to Send Selection Interview Email");
                }
              );
          }
        };
        return (
          <div style={styles.buttonsCellContainer}>
            <button
              title={"Interview Selection Email"}
              style={styles.editButton}
              onClick={() => sendSelectionEmail()}
            >
              <IoMail style={{ color: "rgb(144,238,144)" }} />
            </button>
            {/* <button
              title={"View Candidate Information"}
              style={styles.editButton}
              // onClick={() => sendEmail()}
            >
              <AiOutlineFileSearch style={{ color: "white" }} />
            </button> */}
            <button
              title={"Interview Rejection Email"}
              style={styles.editButton}
              onClick={() => sendRejectionEmail()}
            >
              <IoMail style={{ color: "rgb(254,39,18)" }} />
            </button>
          </div>
        );
      },
    },
  ];
};

export default getColumns;
