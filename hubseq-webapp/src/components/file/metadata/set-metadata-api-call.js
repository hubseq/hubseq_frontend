import axios from "axios";
import React from "react";
import * as path from 'path';
import { awsPipelineAPI_POST } from '../../../utils/aws-session';
// import { Typography } from '@mui/material';

const formatResponse_setMetadata = function( response_raw ){
  let response = {"data": []};

  // add a few keys to raw response
  // id should be a reserved key that cannot be used
  response_raw.data.forEach((e, idx) => e["id"] = idx);
  response.data = response_raw.data;
  return response
}

const createBody_setMetadata = function( myfile, mydir, mytags ){
  let body = {};
  let mytags_dict = {};
  mytags.forEach((t) => {mytags_dict[t["Key"]]=t["Value"]});
  body["objects"] = path.join(mydir,myfile);
  body["tags"] = mytags_dict;
  return body;
}

export async function setMetadataCall(myfile, mydir, mytags, idToken) {
  // runInfo.map(d => d["runid"]);
  const body = createBody_setMetadata(myfile, mydir, mytags);
  const response_raw = await awsPipelineAPI_POST(body, '/test_cors/setmetadata', idToken);
  // const response_raw = await client.request({"data": body});
  const response = formatResponse_setMetadata(response_raw);
  return response.data;
}
