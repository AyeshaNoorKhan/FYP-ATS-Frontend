import React,{useState,useEffect} from 'react';
import GridTable from "@nadavshaar/react-grid-table";
import getColumns from "./getColumns.js";
import {Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import '../../stylesheet/JobDetail.css';

function JobDetail(props) {
    const[show,setShow]=useState(false);
    const [rowsData, setRowsData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
      async function FetchAPI() {
        const response = await fetch('https://atsbackend.herokuapp.com/api/job/getjobs');
        const json = await response.json();
        setLoading(true);
        setTimeout(() => {
          setRowsData(json.getAllJob);
          console.log(json.getAllJob)
          setLoading(false);
        }, 1500);
    }
    FetchAPI();
    }, []);

   
    return (
        <div className="jobdetail">

          <Link to="/jobdetails/addnewjob" style={{textDecoration:"none",color:"gray"}}>
              <Button style={{backgroundColor:"rgb(0, 51, 153)",color:"white"}} >    Add New Job   </Button>
          </Link>

          <p></p>
        
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

export default JobDetail;