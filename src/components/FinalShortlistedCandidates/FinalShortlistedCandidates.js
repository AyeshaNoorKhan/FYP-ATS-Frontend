import React, { useState, useEffect } from "react";
import GridTable from "@nadavshaar/react-grid-table";
import GetColumns from "./getColumns.js";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import "../../stylesheet/JobDetail.css";

function FinalShortlistedCandidates(props) {
  const [rowsData, setRowsData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  async function FetchAPI() {
    const response = await fetch(
      "https://atsbackend.herokuapp.com/api/shortlistcandidate/getAllFinalShortCand"
    );
    const json = await response.json();
    console.log("rowsData: ", json);
    setLoading(true);

    setTimeout(() => {
      setRowsData(json.getAllFinalShortCand);
      console.log("json.getAllCand: ", json.getAllFinalShortCand);
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    FetchAPI();
  }, []);
  return (
    <div className="jobdetail">
      <h5
        style={{
          backgroundColor: "rgb(6, 89, 167)",
          color: "white",
          padding: "7px",
        }}
      >
        SHORTLISTED CANDIDATES FOR JOB INTERVIEW
      </h5>
      <GridTable
        columns={GetColumns({ setRowsData })}
        rows={rowsData}
        isLoading={isLoading}
        onRowClick={({ rowIndex, data, column, isEdit, event }, tableManager) =>
          !isEdit &&
          tableManager.rowSelectionApi.getIsRowSelectable(data.id) &&
          tableManager.rowSelectionApi.toggleRowSelection(data.id)
        }
      />
    </div>
  );
}

export default FinalShortlistedCandidates;
