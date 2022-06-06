import React from "react";
import axios from 'axios';

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
    alignItems: "center"
  },
  editButton: {
    background: "#f3f3f3",
    outline: "none",
    cursor: "pointer",
    padding: 4,
    display: "inline-flex",
    border: "none",
    borderRadius: "50%",
    boxShadow: "1px 1px 2px 0px rgb(0 0 0 / .3)"
  },
  buttonsCellEditorContainer: {
    height: "100%",
    width: "100%",
    display: "inline-flex",
    padding: "0 20px",
    justifyContent: "flex-end",
    alignItems: "center"
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
    boxShadow: "1px 1px 2px 0px rgb(0 0 0 / .3)"
  },
  saveButton: {
    background: "#f3f3f3",
    outline: "none",
    cursor: "pointer",
    padding: 2,
    display: "inline-flex",
    border: "none",
    borderRadius: "50%",
    boxShadow: "1px 1px 2px 0px rgb(0 0 0 / .3)"
  }
};

const getColumns = ({ setRowsData }) => {
  return [
    {
      id: "checkbox",
      visible: true,
      pinned: true,
      width: "54px"
    },
    {
      id: "2",
      field: "job_id",
      label: "Job ID",
    },
    {
      id: "3",
      field: "job_code",
      label: "Job Code"
    },
    {
      id: "4",
      field: "job_category",
      label: "Job Category"
    },
    {
      id: "5",
      field: "job_title",
      label: "Job Title"
    },
    {
      id: "6",
      field: "job_location",
      label: "Job Location"
    },
    {
      id: "7",
      field: "job_positions",
      label: "No. of Positions"
    },
    {
      id: "8",
      field: "job_descriptionA",
      label: "Job Description A"
    },
    {
      id: "9",
      field: "job_descriptionB",
      label: "Job Description B"
    },
    {
      id: "10",
      field: "job_descriptionC",
      label: "Job Description C"
    },
    {
      id: "11",
      field: "job_descriptionD",
      label: "Job Description D"
    },
    {
      id: "12",
      field: "job_descriptionE",
      label: "Job Description E"
    },
    {
      id: "13",
      field: "job_descriptionF",
      label: "Job Description F"
    },
    {
      id: "14",
      field: "job_descriptionG",
      label: "Job Description G"
    },
    {
      id: "15",
      field: "job_descriptionH",
      label: "Job Description H"
    },
    {
      id: "16",
      field: "job_qualificationA",
      label: "Job Qualification A"
    },
    {
      id: "17",
      field: "job_qualificationB",
      label: "Job Qualification B"
    },
    {
      id: "18",
      field: "job_qualificationC",
      label: "Job Qualification C"
    },
    {
      id: "19",
      field: "job_qualificationD",
      label: "Job Qualification D"
    },
    {
      id: "20",
      field: "job_qualificationE",
      label: "Job Qualification E"
    },
    {
      id: "21",
      field: "job_experience",
      label: "Job Experience"
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
        rowIndex
      }) => (
        <div style={styles.buttonsCellContainer}>
          <button
            title="Edit"
            style={styles.editButton}
            onClick={(e) => {
              e.stopPropagation();
              // alert("hello")
              tableManager.rowEditApi.setEditRowId(data.id);
            }}
          >
            {EDIT_SVG}
          </button>
        </div>
      ),
      editorCellRenderer: ({
        tableManager,
        value,
        data,
        column,
        colIndex,
        rowIndex,
        onChange
      }) => (
        <div style={styles.buttonsCellEditorContainer}>
          <button
            title="Cancel"
            style={styles.cancelButton}
            onClick={(e) => {
              e.stopPropagation();
              tableManager.rowEditApi.setEditRowId(null);
            }}
          >
            {CANCEL_SVG}
          </button>
          <button
            title="Save"
            style={styles.saveButton}
            onClick={(e) => {
              e.stopPropagation();
              let rowsClone = [...tableManager.rowsApi.rows];
              let updatedRowIndex = rowsClone.findIndex(
                (r) => r.id === data.id
              );
              rowsClone[updatedRowIndex] = data;
              setRowsData(rowsClone);
              const postData= ()=>{
                const {_id,job_id,job_code,job_category,job_title,job_location,job_positions,
                  job_descriptionA,job_descriptionB,job_descriptionC,job_descriptionD,job_descriptionE,job_descriptionF,job_descriptionG,job_descriptionH,
                  job_qualificationA,job_qualificationB,job_qualificationC,job_qualificationD,job_qualificationE,job_experience}=data;
                var UpdatedJob ={_id,job_id,job_code,job_category,job_title,job_location,job_positions,
                  job_descriptionA,job_descriptionB,job_descriptionC,job_descriptionD,job_descriptionE,job_descriptionF,job_descriptionG,job_descriptionH,
                  job_qualificationA,job_qualificationB,job_qualificationC,job_qualificationD,job_qualificationE,job_experience};
                axios.put('https://atsbackend.herokuapp.com/api/job/updatejob', UpdatedJob)
                .then( res => {
                  alert('Updated successfully!');
                 }   
                )
                .catch(err => {
                  console.log(err.response);
                  alert('An error occurred! Try submitting the form again.');
                });
              } 
              postData();
              tableManager.rowEditApi.setEditRowId(null);
            }}
          >
            {SAVE_SVG}
          </button>
        </div>
      )
    }
  ];
};

export default getColumns;
 