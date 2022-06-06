import React, { useState ,useEffect} from 'react';
import GridTable from "@nadavshaar/react-grid-table";
import getColumns from "./getColumns.js";
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import '../../../stylesheet/JobDetail.css';

function CandidateProfile(props) {
    const [show, setShow] = useState(false);
    const [rowsData, setRowsData] = useState([]);
    const [isLoading, setLoading] = useState(false);
      var myobj;
      async function FetchAPI() {
        const response = await fetch('https://atsbackend.herokuapp.com/api/candinfo/getallcandinfo');
        const json = await response.json();
        setLoading(true);
        json.getAllCand.map((res)=>{
            // function renderPDF (){
            const base64String = btoa(String.fromCharCode(... new Uint32Array(res.cand_Resume.data.data)))
            // return (<a href={`data:application/pdf;base64,${base64String}`}>Resume.pdf</a>)
            // }
           myobj=
          [{
            cand_id:res.cand_id,
            cand_name:res.cand_name,
            cand_email:res.cand_email,
            cand_contact:res.cand_contact,
            cand_city:res.cand_city,
            cand_country:res.cand_country,
            cand_highedu:res.cand_highedu,
            cand_workexp:res.cand_workexp,
            cand_gender:res.cand_gender,
            cand_shiftspref:res.cand_shiftspref,
            cand_hecverif:res.cand_hecverif,
            cand_positionApplied:res.cand_positionApplied,
            cand_Resume:res.cand_Resume? <a href={`data:application/pdf;base64,${base64String}`}>Resume.pdf</a> : "No preview"
          }]
        })  
        setTimeout(() => {
          setRowsData(myobj);
          console.log(myobj)
          // console.log(json.getAllCand[0].cand_hecverif)
          setLoading(false);
        }, 1000);
    }

    useEffect(() => {
      FetchAPI();
      }, []);

    return (
        <div className="jobdetail">
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