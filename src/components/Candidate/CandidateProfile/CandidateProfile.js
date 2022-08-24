import React, { useState, useEffect } from "react";
import GridTable from "@nadavshaar/react-grid-table";
import getColumns from "./getColumns.js";
import "../../../stylesheet/JobDetail.css";

function CandidateProfile(props) {
  const [rowsData, setRowsData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  async function FetchAPI() {
    const response = await fetch(
      "https://atsbackend.herokuapp.com/api/candinfo/getallcandinfo"
    );
    const json = await response.json();
    console.log("rowsData: ", json);
    setLoading(true);

    setTimeout(() => {
      setRowsData(json.getAllCand);
      console.log("json.getAllCand: ", json.getAllCand);
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
        CANDIDATE INFORMATION
      </h5>
      <GridTable
        columns={getColumns({ setRowsData })}
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

export default CandidateProfile;
