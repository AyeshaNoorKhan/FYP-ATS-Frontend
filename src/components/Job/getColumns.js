import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddJobModal from "./AddJobModal";
import { IoMail } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";

const EDIT_SVG = (
  <svg
    height="16"
    viewBox="0 0 20 20"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="white" stroke="#1856bf" transform="translate(2 2)">
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
      field: "job_id",
      label: "Job ID",
    },
    {
      id: "3",
      field: "job_code",
      label: "Job Code",
    },
    {
      id: "4",
      field: "job_category",
      label: "Job Category",
    },
    {
      id: "5",
      field: "job_title",
      label: "Job Title",
    },
    {
      id: "6",
      field: "job_location",
      label: "Job Location",
    },
    {
      id: "7",
      field: "job_positions",
      label: "No. of Positions",
    },
    {
      id: "8",
      field: "job_description",
      label: "Job Description",
      cellRenderer: ({ data }) => {
        const jobdesc = data.job_description
          .replace(/<[^>]+>/g, "")
          .substring(0, 50);
        return (
          <div
            className="post__description"
            dangerouslySetInnerHTML={{
              __html: jobdesc,
            }}
          />
        );
      },
    },
    {
      id: "9",
      field: "job_qualification",
      label: "Job Qualification",
      cellRenderer: ({ data }) => {
        const jobqua = data.job_qualification
          .replace(/<[^>]+>/g, "")
          .substring(0, 50);
        return (
          <div
            className="post__description"
            dangerouslySetInnerHTML={{
              __html: jobqua,
            }}
          />
        );
      },
    },
    {
      id: "21",
      field: "job_experience",
      label: "Job Experience",
      cellRenderer: ({ data }) => {
        const jobexp = data.job_experience
          .replace(/<[^>]+>/g, "")
          .substring(0, 50);
        return (
          <div
            className="post__description"
            dangerouslySetInnerHTML={{
              __html: jobexp,
            }}
          />
        );
      },
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
          }
        };
        return (
          <div style={styles.buttonsCellContainer}>
            <Link
              to={"/jobdetails/updatejob/" + data.job_id}
              style={{ textDecoration: "none" }}
            >
              <button
                title={"Edit Job"}
                style={styles.editButton}
                onClick={() => sendEmail()}
              >
                {EDIT_SVG}
              </button>
            </Link>

            <Link
              to={"/jobdetails/getjob/" + data.job_id}
              style={{ textDecoration: "none" }}
            >
              <button
                title={"View Job"}
                style={styles.editButton}
                onClick={() => sendEmail()}
              >
                <IoEyeSharp style={{ color: "white" }} />
              </button>
            </Link>
          </div>
        );
      },
    },
  ];
};

export default getColumns;
