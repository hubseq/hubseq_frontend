import axios from "axios";
import React from "react";
// import { JobListResults } from './job-list-results';
// import { Typography } from '@mui/material';
import { awsPipelineAPI_POST } from '../../utils/aws-session';

const formatResponse_RunList = function( response_raw, runs ){
  let response = {"data": []};

  // add a few keys to raw response
  response_raw.data[0].forEach((e, idx) => e["id"] = idx);
  // only return jobs that match the run selected
  console.log('FORMAT RESPONSE RUNLIST RUNS: ', runs);
  response.data = response_raw.data[0].filter((val, i, arr) => val["runid"]==runs[0]);
  return response
}

export async function jobsCall(runs, idToken) {
  const body = {"table": "jobs"};
  //const response_raw = await client.request({"data": body});
  const response_raw = await awsPipelineAPI_POST(body, '/test_cors/gettable', idToken);
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
      const body = {"table": "jobs"};
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
