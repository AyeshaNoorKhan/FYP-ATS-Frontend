import React from 'react';
import Header from './components/Header';
import JobList from './components/JobList';
import DummyJobs from './dummyjobs.json'; 
import './App.css';

function App() {
  const [jobList, updateJobs] = React.useState([]);

  React.useEffect(()=> {
    const json = DummyJobs;
  }, [])

  return (
    <div className="App">
      <Header />
      <JobList joblist={jobList} />
      
    </div>
  );
}

export default App;
