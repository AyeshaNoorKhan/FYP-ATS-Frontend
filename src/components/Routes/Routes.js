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
import CandidateProfile from '../Candidate/CandidateProfile/CandidateProfile.js';
import CandidateResume from '../Candidate/CandidateResume/CandidateResume.js';
import CandidateTestScore from '../Candidate/CandidateTestScore/CandidateTestScore.js';
import GraphicalAptTest from '../GraphicalAptitudeTest/GraphicalAptTest.js';

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
                    <Route path="/finalshortlistedcandidates"  element={<FinalShortlistedCandidates/>} />
                    <Route path="/candidateprofile"  element={<CandidateProfile/>} />
                    <Route path="/candidateprofile/view"  element={<CandidateProfile/>} />
                    <Route path="/candidateresume" element={<CandidateResume/>} />
                    <Route path="/candidatetestscore" element={<CandidateTestScore/>} />
                    <Route path="/graphapttest" element={<GraphicalAptTest/>} />
                </Routes>
        </div>
    );
}

export default RoutesNav;