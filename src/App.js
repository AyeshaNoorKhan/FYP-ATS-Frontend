import Header from './components/Header';
import './App.css';
import JobListingPage from './components/JobListingPage/JobListingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import JobDetailApplyPage from './components/JobDetailApplyPage/JobDetailApplyPage.js'
import JobDetailApply from './components/JobDetailApply/JobDetailApply.js';
function App() {
  

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<JobListingPage />} />
          <Route path="/jobdetail/:jobId" element={<JobDetailApply />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
