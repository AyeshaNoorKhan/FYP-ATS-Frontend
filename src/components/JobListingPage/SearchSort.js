import { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function SearchSort({ joblist, filteredJobs, setFilteredJobs }) {
    const [filters, setFilters] = useState(
        {
            search: "",
        }
    );
    const search = (search) => {
        setFilters({ search });
    }

    useEffect(() => {
        let jobs = joblist.filter(j => j.job_title.toLowerCase().indexOf(filters.search.toLowerCase()) >= 0);
        if (jobs.length == 0) {
            setFilteredJobs(jobs);
        }
        else {
            setFilteredJobs(jobs);
        }
    }, [filters])

    return (
        <>
            <Card bg="light">
                <Card.Body>
                    <Form.Control style={{ paddingLeft: "35px" }} type="text" placeholder="Search..." onChange={e => search(e.target.value)}></Form.Control>
                    <span style={{ color: "Gray", float: "left", marginLeft: "10px", marginTop: "-31px", position: "relative", zIndex: "2" }}><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                </Card.Body>
            </Card>
            {!filteredJobs.length ? 
            <div className="mt-5 " style={{color:"#495057",textAlign:"center", fontSize:"larger"}}>No matching jobs found.</div> 
            : ""}
        </>
    )
}

export default SearchSort