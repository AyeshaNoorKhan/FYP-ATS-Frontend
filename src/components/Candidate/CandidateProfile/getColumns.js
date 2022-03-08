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
            field: "candidateid",
            label: "Candidate ID",
        },
        {
            id: "3",
            field: "candidateemail",
            label: "Candidate Email"
        },
        {
            id: "4",
            field: "candidatefname",
            label: "First Name"
        },
        {
            id: "5",
            field: "candidatemname",
            label: "Middle Name"
        },
        {
            id: "6",
            field: "candidatelname",
            label: "Last Name"
        },
        {
            id: "7",
            field: "candidatedob",
            label: "Date Of Birth"
        },
        {
            id: "8",
            field: "candidatefathername",
            label: "Father's Name"
        },
        {
            id: "9",
            field: "candidatephone",
            label: "Phone No."
        },
        {
            id: "10",
            field: "candidatestreet",
            label: "Street Address"
        },
        {
            id: "11",
            field: "candidatecity",
            label: "City"
        },
        {
            id: "12",
            field: "candidatepostcode",
            label: "Postal Code"
        },
        {
            id: "13",
            field: "candidatecountry",
            label: "Country"
        },
        {
            id: "15",
            field: "candidatecnic",
            label: "CNIC No."
        },
        {
            id: "16",
            field: "candidatemarital",
            label: "Marital Status"
        },
        {
            id: "17",
            field: "candidatesource",
            label: "Candidate Source"
        },
        {
            id: "18",
            field: "candidateref",
            label: "Referred By"
        },
        {
            id: "19",
            field: "candidatehighestedu",
            label: "Highest Education"
        },{
            id: "20",
            field: "candidateexperience",
            label: "Work Experience"
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
                                const postData = () => {
                                    const { _id, id, candidateid, candidateemail, candidatefname, candidatemname, candidatelname, candidatedob, candidatephone, candidatestreet, candidatecity, candidatepostcode, candidatecountry, candidatecnic, candidatemarital, candidatesource, candidateref} = data;
                                    var UpdatedMemInfo = { _id, id, candidateid, candidateemail, candidatefname, candidatemname, candidatelname, candidatedob, candidatephone, candidatestreet, candidatecity, candidatepostcode, candidatecountry, candidatecnic, candidatemarital, candidatesource, candidateref};
                                    axios.put('/memberinfoupdateadmin', UpdatedMemInfo)
                                        .then(res => {
                                            alert('Updated successfully!');
                                        }
                                        )
                                        .catch(err => {
                                            console.log(err.response);
                                            alert('An error occurred! Try submitting the form again.');
                                        });
                                }
                                postData();
                                console.log(data);
                                console.log(data.id);
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
