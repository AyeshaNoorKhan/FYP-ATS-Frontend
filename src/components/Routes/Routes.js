import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login.js";
import Home from "../Home/Home.js";
import "../../stylesheet/Routs.css";
import JobDetail from "../Job/JobDetail.js";
import AptitudeTest from "../AptitudeTest/AptitudeTest.js";
import AddAptitudeTestQuestion from "../AptitudeTest/AddAptitudeTestQuestion.js"
import ShortlistedResume from "../ShortlistedResume/ShortlistedResume.js";
import FinalShortlistedCandidates from "../FinalShortlistedCandidates/FinalShortlistedCandidates.js";
import CandidateProfile from "../Candidate/CandidateProfile/CandidateProfile.js";
import CandidateResume from "../Candidate/CandidateResume/CandidateResume.js";
import CandidateTestScore from "../Candidate/CandidateTestScore/CandidateTestScore.js";
import GraphicalAptTest from "../GraphicalAptitudeTest/GraphicalAptTest.js";
import AddJobModal from "../Job/AddJobModal.js";
import SpecificJobDetail from "../Job/SpecificJobDetail.js";
import EditJobDetail from "../Job/EditJobDetail.js";

function RoutesNav(props) {
  return (
    <div className="routs">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/jobdetails" element={<JobDetail />} />
        <Route path="/jobdetails/addnewjob" element={<AddJobModal />} />
        <Route
          path="/jobdetails/getjob/:jobId"
          element={<SpecificJobDetail />}
        />
        <Route
          path="/jobdetails/updatejob/:jobId"
          element={<EditJobDetail />}
        />
        <Route path="/aptitudequestion" element={<AptitudeTest />} />
        <Route
          path="/aptitudequestion/addnewquestion"
          element={<AddAptitudeTestQuestion />}
        />
        <Route path="/shortlistedresume" element={<ShortlistedResume />} />
        <Route
          path="/finalshortlistedcandidates"
          element={<FinalShortlistedCandidates />}
        />
        <Route path="/candidateprofile" element={<CandidateProfile />} />
        <Route path="/candidateprofile/view" element={<CandidateProfile />} />
        <Route path="/candidateresume" element={<CandidateResume />} />
        <Route path="/candidatetestscore" element={<CandidateTestScore />} />
        <Route path="/graphapttest" element={<GraphicalAptTest />} />
      </Routes>
    </div>
  );
}

export default RoutesNav;
