import React from "react";
import axios from "axios";
import { FaFileDownload } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";

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
    padding: 7,
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
      field: "cand_id",
      label: "Candidate ID",
    },
    {
      id: "3",
      field: "cand_name",
      label: "Full Name",
    },
    {
      id: "4",
      field: "cand_email",
      label: "Email",
    },
    {
      id: "5",
      field: "cand_contact",
      label: "Contact No.",
    },
    {
      id: "6",
      field: "cand_city",
      label: "City",
    },
    {
      id: "7",
      field: "cand_country",
      label: "Country",
    },
    {
      id: "8",
      field: "cand_highedu",
      label: "Highest Education",
    },
    {
      id: "9",
      field: "cand_workexp",
      label: "Work Experience",
    },
    {
      id: "10",
      field: "cand_gender",
      label: "Gender",
    },
    {
      id: "11",
      field: "cand_shiftspref",
      label: "Shift Preferance",
    },
    {
      id: "12",
      field: "cand_hecverif",
      label: "HEC Verified Degree",
    },
    {
      id: "13",
      field: "cand_positionApplied",
      label: "Position Applied For",
    },
    // {
    //   id: "14",
    //   field: "cand_ResumeURL",
    //   label: "View Resume",
    //   cellRenderer: ({ data }) => {
    //     return (
    //       <a href={data?.cand_ResumeURL} target="_blank">
    //         View PDF
    //       </a>
    //     );
    //   },
    // },
    // {
    //   id: "15",
    //   field: "cand_Resume",
    //   label: "Download Resume",
    //   cellRenderer: ({ data }) => {
    //     const link = window.URL.createObjectURL(
    //       new Blob([new Uint8Array(data?.cand_Resume?.data).buffer])
    //     );
    //     return (
    //       <a
    //         href={link}
    //         download={`${data?.cand_id}-${data?.cand_name}-Resume.pdf`}
    //       >
    //         {" "}
    //         <FaFileDownload style={{ color: "black" }} />
    //       </a>
    //     );
    //   },
    // },
    {
      id: "buttons",
      width: "max-content",
      pinned: true,
      sortable: true,
      resizable: true,
      cellRenderer: ({
        tableManager,
        value,
        data,
        column,
        colIndex,
        rowIndex,
      }) => {
        const link = window.URL.createObjectURL(
          new Blob([new Uint8Array(data?.cand_Resume?.data).buffer])
        );
        return (
          <div style={styles.buttonsCellContainer}>
            {/* <button title="Edit" style={styles.editButton}>
              {EDIT_SVG}
            </button> */}
            <a
              href={data?.cand_ResumeURL}
              target="_blank"
              style={styles.editButton}
              title="View Resume"
            >
              <FaFilePdf style={{ color: "white" }} />
            </a>
            <p> </p>
            <a
              href={link}
              download={`${data?.cand_id}-${data?.cand_name}-Resume.pdf`}
              style={styles.editButton}
              title="Download Resume"
            >
              {" "}
              <FaFileDownload style={{ color: "white" }} />
            </a>
          </div>
        );
      },
    },
  ];
};

export default getColumns;
