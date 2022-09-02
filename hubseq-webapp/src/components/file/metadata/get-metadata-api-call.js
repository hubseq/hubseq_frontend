import axios from "axios";
import React from "react";
import * as path from 'path';
import { awsPipelineAPI_POST } from '../../../utils/aws-session';
// import { Typography } from '@mui/material';


const formatResponse_getMetadata = function( response_raw ){
  let response = {"data": []};

  // add a few keys to raw response
  // id should be a reserved key that cannot be used
  response_raw.data.forEach((e, idx) => e["id"] = idx);
  response.data = response_raw.data;
  return response
}

export async function getMetadataCall(myfiles, mydir, idToken) {
  // runInfo.map(d => d["runid"]);
  console.log('MY FILES IN METADATA CAL: ', myfiles);
  const body = {"objects": myfiles.map(f => (path.join(mydir,f))).join(",")};
  console.log('BODY BODY: ', body);
  const response_raw = await awsPipelineAPI_POST(body, '/test_cors/getmetadata', idToken);
  // const response_raw = await client.request({"data": body});
  console.log('RESPONSE RAW', response_raw);

  const response = formatResponse_getMetadata(response_raw);
  console.log('RESPONSE AFTER: ', response);

  return response.data;
}
