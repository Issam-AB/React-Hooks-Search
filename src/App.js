import React, { useState } from 'react';
import  useFetchJobs from './useFetchJobs';
import { Container } from 'react-bootstrap';
import Job from './Job';
import JobsPagonation from './JobsPagination'
import SearchForm from './SearchForm';
import './App.css';

function App() {
  const [params,setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error } =  useFetchJobs(params,page);

  function handlParamChange(e) {
    const param = e.target.name 
    const value = e.target.value
    setPage(1)
    setParams(prevParams => {
      return {...prevParams, [param]: value}
    })
  }

  return (
    <Container className="my-4">
    <h1 className="mb-4">GitHub Jobs</h1>
    <SearchForm params={params} onParamChange={handlParamChange}/>
    <JobsPagonation page={page} setPage={setPage} hasNextPage={true}/>
    {loading && <h1>loading...</h1>}
    {error && <h1>Error. try to Refreshing.</h1>}
    {jobs.map(job => {
      return <Job key={job.id} job={job} />
    })}
    <JobsPagonation page={page} setPage={setPage} hasNextPage={true} />
    </Container>
  );
}

export default App;
