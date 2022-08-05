import axios from "axios";
import React from "react";
import * as path from 'path';

// import { Typography } from '@mui/material';

const client = axios.create({
  baseURL: "https://cs8ibwdms8.execute-api.us-west-2.amazonaws.com/test_cors/getmetadata",
  // url: '/listobjects',
  method: 'POST'
});

const _addKeys = function(e, idx){
  e["id"] = idx;
  return e
}

const formatResponse_getMetadata = function( response_raw ){
  let response = {"data": []};

  // add a few keys to raw response
  // id should be a reserved key that cannot be used
  response_raw.data.data.forEach((e, idx) => e["id"] = idx);
  response.data = response_raw.data.data;
  return response
}

export async function getMetadataCall(myfiles, mydir) {
  // runInfo.map(d => d["runid"]);
  console.log('MY FILES IN METADATA CAL: ', myfiles);
  const body = {"objects": myfiles.map(f => ("s3://"+path.join(mydir,f))).join(",")};
  console.log('BODY BODY: ', body);
  const response_raw = await client.request({"data": body});
  console.log('RESPONSE RAW', response_raw);

  const response = formatResponse_getMetadata(response_raw);
  console.log('RESPONSE AFTER: ', response);

  return response.data;
}
