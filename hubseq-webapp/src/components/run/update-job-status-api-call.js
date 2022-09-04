import axios from "axios";
import React from "react";
// import { JobListResults } from './job-list-results';
// import { Typography } from '@mui/material';
import { awsPipelineAPI_POST } from '../../utils/aws-session';

//const formatResponse_updateJobStatus = function( response_raw, runs ){
//  let response = {"data": []};
//  response.data = response_raw.data;
//  return response
//}

export async function updateJobStatusCall(idToken) {
  const body = {"foo": ""};
  //const response_raw = await client.request({"data": body});
  const response_raw = await awsPipelineAPI_POST(body, '/test_cors/updatejobstatus', idToken);
  // const response = formatResponse_updateJobStatus(response_raw, runs);
  return response_raw.data;
}
