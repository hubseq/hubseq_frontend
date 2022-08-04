import axios from "axios";
import React from "react";
// import { JobListResults } from './job-list-results';
// import { Typography } from '@mui/material';

const client = axios.create({
  baseURL: "https://cs8ibwdms8.execute-api.us-west-2.amazonaws.com/test_cors/gettable",
  // url: '/listobjects',
  method: 'POST'
});

const _addKeys = function(e, idx){
  e["id"] = idx;
  return e
}

const formatResponse_RunList = function( response_raw, runs ){
  let response = {"data": []};

  // add a few keys to raw response
  response_raw.data[0].forEach((e, idx) => e["id"] = idx);
  // only return jobs that match the run selected
  console.log('RUNS: ', runs);
  response.data = response_raw.data[0].filter((val, i, arr) => val["runid"]==runs[0]);
  return response
}

export async function jobsCall(runs) {
  const body = {"userid": "testuser1", "teamid": "hubseq", "table": "jobs"};
  const response_raw = await client.request({"data": body});
  console.log(response_raw);

  const response = formatResponse_RunList(response_raw, runs);
  console.log(response);

  return response.data;
}

/*
export default function JobList({runs, ...rest}) {
  const [jobs, setJobs] = React.useState([]);

  React.useEffect(() => {
    async function getJobs() {
      const body = {"userid": "testuser1", "teamid": "hubseq", "table": "jobs"};
      const response = await jobsCall(body, runs);
      setJobs(response.data);
    }
    getJobs();
  }, []);

  console.log("JOBS BEFORE CALL TO JBOS JOBS: ", jobs);
  return (
    <JobListResults myruns={runs} myjobs={jobs} />
  );
}
*/
