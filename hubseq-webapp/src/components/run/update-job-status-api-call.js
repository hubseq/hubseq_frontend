import axios from "axios";
import React from "react";
// import { JobListResults } from './job-list-results';
// import { Typography } from '@mui/material';
import { awsPipelineAPI_POST } from '../../utils/aws-session';

const client = axios.create({
  baseURL: "https://cs8ibwdms8.execute-api.us-west-2.amazonaws.com/test_cors/updatejobstatus",
  // url: '/listobjects',
  method: 'POST'
});

//const formatResponse_updateJobStatus = function( response_raw, runs ){
//  let response = {"data": []};
//  response.data = response_raw.data;
//  return response
//}

export async function updateJobStatusCall(idToken) {
  const teamid = "tranquis"; // get from session variable later
  const body = {"teamid": teamid};
  //const response_raw = await client.request({"data": body});
  const response_raw = await awsPipelineAPI_POST(body, '/test_cors/updatejobstatus', idToken);
  console.log(response_raw);
  // const response = formatResponse_updateJobStatus(response_raw, runs);
  // console.log(response);
  return response_raw.data;
}
