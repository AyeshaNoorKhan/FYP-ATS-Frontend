import React, { useState } from 'react';
// import MaterialTable from 'material-table';
import GridTable from "@nadavshaar/react-grid-table";
import getColumns from "./getColumns.js";
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
// import {Link} from "react-router-dom";
import '../../../stylesheet/JobDetail.css';

function CandidateResume(props) {
    const [show, setShow] = useState(false);
    const [rowsData, setRowsData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    return (
        <div className="jobdetail">
            <h5
                style={{
                    backgroundColor: "rgb(6, 89, 167)",
                    color: "white",
                    padding: "7px",
                }}
            >
                RESUME INFORMATION
            </h5>
            <GridTable
                columns={getColumns({ setRowsData })}
                onRowClick={({ rowIndex, data, column, isEdit, event }, tableManager) =>
                    !isEdit &&
                    tableManager.rowSelectionApi.getIsRowSelectable(data.id) &&
                    tableManager.rowSelectionApi.toggleRowSelection(data.id)
                }
            />
        </div>
    );
}

export default CandidateResume;