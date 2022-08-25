import React, { useState } from "react";
import axios from "axios";
import { IoMail } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa";
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
    background: "#f3f3f3",
    outline: "none",
    cursor: "pointer",
    padding: 2,
    display: "inline-flex",
    border: "none",
    borderRadius: "50%",
    boxShadow: "1px 1px 2px 0px rgb(0 0 0 / .3)",
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
      field: "short_resume_id",
      label: "Shortlisted Resume ID",
    },
    {
      id: "3",
      field: "cand_id",
      label: "Candidate ID",
    },
    {
      id: "4",
      field: "job_id",
      label: "Job ID",
    },
    {
      id: "5",
      field: "resume_rank",
      label: "Resume Rank",
    },
    {
      id: "6",
      field: "resume_url",
      label: "View Resume",
      cellRenderer: ({ data }) => {
        return (
          <div
            className="rgt-cell-inner"
            style={{
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              marginLeft: "5rem",
            }}
          >
            <a
              href={data?.resume_url}
              target="_blank"
              style={{ fontSize: "30px", textAlign: "center" }}
            >
              <FaFilePdf style={{ color: "rgb(6, 89, 167)" }} />
            </a>
          </div>
        );
      },
    },
    {
      id: "7",
      field: "test_link_status",
      label: "Test Link",
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
        const sendEmail = async () => {
          const response = await fetch(
            "https://atsbackend.herokuapp.com/api/candinfo/getcandinfo/" +
              data.cand_id
          );
          const json = await response.json();
          console.log("rowsData: ", json);
          var apiData = json.getCand[0];
          console.log(apiData);

          if (apiData) {
            let templateParams = {
              cand_name: apiData.cand_name,
              cand_email: apiData.cand_email,
              HR_email: "khan4100339@cloud.neduet.edu.pk",
            };
            emailjs
              .send(
                "gmail",
                "template_91vyob6",
                templateParams,
                "user_ctTO3wf4auf2drAPyOGXb"
              )
              .then(
                (response) => {
                  alert(
                    "Successfully sent test link email to ",
                    apiData.cand_name
                  );

                  axios
                    .put(
                      "https://atsbackend.herokuapp.com/api/shortlistresume/updateTestLinkStatus/" +
                        apiData.job_id +
                        "/" +
                        apiData.cand_id,
                      {
                        test_link_status: "Assigned",
                      }
                    )
                    .then((res) => {
                      if (res.status == 200) {
                        alert("Candidate Test Link Status Updated");
                        window.location.reload();
                      } else {
                        alert("Failed to Update Candidate Test Link Status");
                      }
                    });
                },
                (err) => {
                  alert("Failed to Send Email Link");
                }
              );
          }
        };
        return (
          <div style={styles.buttonsCellContainer}>
            <button
              title={"Send Test Link "}
              style={styles.editButton}
              onClick={() => sendEmail()}
            >
              <IoMail style={{ color: "white" }} />
            </button>
          </div>
        );
      },
    },
  ];
};

export default getColumns;
