import React from 'react';
import {Route,Routes} from "react-router-dom";
import Login from '../Login/Login.js'
import Home from '../Home/Home.js';
import '../../stylesheet/Routs.css';
import JobDetail from '../Job/JobDetail.js';
import NavBar from '../Home/NavBar.js';
import AptitudeTest from '../AptitudeTest/AptitudeTest.js';
import ShortlistedResume from '../ShortlistedResume/ShortlistedResume.js';
import FinalShortlistedCandidates from '../FinalShortlistedCandidates/FinalShortlistedCandidates.js';

function RoutesNav(props) {
    return (
        <div className="routs">
            <NavBar/>
                <Routes>
                    <Route path="/"  element={<Login/>} />
                    <Route path="/home"  element={<Home/>} />
                    <Route path="/jobdetails"  element={<JobDetail/>} />
                    <Route path="/jobdetails/addnewjob"  element={<JobDetail/>} />
                    <Route path="/aptitudequestion"  element={<AptitudeTest/>} />
                    <Route path="/aptitudequestion/addnewquestion"  element={<AptitudeTest/>} />
                    <Route path="/shortlistedresume"  element={<ShortlistedResume/>} />
                    <Route path="/FinalShortlistedCandidates"  element={<FinalShortlistedCandidates/>} />

                </Routes>
        </div>
    );
}

export default RoutesNav;