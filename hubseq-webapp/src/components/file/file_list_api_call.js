import axios from "axios";
import React from "react";
// import { FileListResults } from './file-list-results';
import * as awsApiGatewayClient from "aws-api-gateway-client";
import { notEmpty, addTrailingSlash } from '../../utils/jsutils';
// import { Typography } from '@mui/material';

const awsCall_ListObject = function(path, searchFilter){
  let apigClientFactory = awsApiGatewayClient.default;
  let apigClient = apigClientFactory.newClient({
    invokeUrl: "https://cs8ibwdms8.execute-api.us-west-2.amazonaws.com",
    region: "us-west-2",
    accessKey: "access key here",
    secretKey: "secret key here",
    sessionToken: "session token here"
  });

  let pathParams = {};
  let pathTemplate = '/test_cors/listobjects';
  let method = 'POST';
  let additionalParams = {};
  let body = notEmpty(searchFilter) ? {"path": path, "searchpattern": searchFilter[0]} : {"path": path};

  // this looks messy - maybe need to clean up this code
  return new Promise(function(resolve, reject){
    apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams, body)
    .then(function(result){
      resolve(result);
    }).catch( function(err){
      reject(err);
    });
  });
};

const client = axios.create({
  baseURL: "https://cs8ibwdms8.execute-api.us-west-2.amazonaws.com/test_cors/listobjects",
  // url: '/listobjects',
  method: 'POST'
});

const _addKeys = function(e, idx){
  e["id"] = idx;
  e["Key"] = e["Prefix"]; // .split('/').pop();
  e["LastModified"] = "-";
  e["Size"] = 0;
  return e
}

const formatResponse_FileList = function( response_raw, called_path ){
  let response = {"data": []};
  let num_folders = 0;

  // handle folders - add ID
  if (response_raw.data.hasOwnProperty("CommonPrefixes")){
    num_folders = response_raw.data["CommonPrefixes"].length;
    response_raw.data["CommonPrefixes"].forEach((e, idx) => _addKeys(e, idx));
    // add folders to final response data first
    response.data = response_raw.data["CommonPrefixes"];
  }
  // handle files - add ID
  if (response_raw.data.hasOwnProperty("Contents")){
    response_raw.data["Contents"].forEach((e, idx) => e["id"] = num_folders+idx);
    // AWS is weird - sometimes returns the actual path folder
    console.log('ALL CONTENTS: ', response_raw.data["Contents"]);
    console.log('CALLED PATH: ', called_path, " WITH SLASH: ", addTrailingSlash(called_path) + " AND FILE TYPE ", (typeof called_path));
    response_raw.data["Contents"] = response_raw.data["Contents"].filter((e) => !addTrailingSlash(called_path).endsWith(e["Key"]));
    console.log('CONTENTS AFTER FILTERING: ', response_raw.data["Contents"]);
    // then add files
    response.data = response.data.concat( response_raw.data["Contents"] );
  }
  return response
}

export async function getFileCall( path, ...searchParams ){
  // const body = {"path": path};
  // const response_raw = await client.request({"data": body});
  console.log("PATH BEING CALLED NOW! ", path);
  console.log("search Params!!! ", searchParams);
  const response_raw = await awsCall_ListObject("s3://"+addTrailingSlash(path), searchParams);
  console.log("RESPONSE RAW: ", response_raw);

  const response = formatResponse_FileList(response_raw, addTrailingSlash(path));
  console.log(response);

  return response.data;
};

/*
export default function FileList({files, setFiles, currentPath, setFilesSelected, setCurrentPath}) {

  React.useEffect(() => {
    async function getFiles() {
      // const body = {"path": path};
      // const response_raw = await client.request({"data": body});
      const response_raw = await awsCall_ListObject("s3://"+currentPath);
      console.log("RESPONSE RAW: ", response_raw);

      const response = formatResponse_FileList(response_raw)
      console.log(response);

      setFiles(response.data);
      // setFile([response.data]);
    }
    getFiles();
  }, []);


  // //Example of conditional rendering
  // let files;
  // if (!file.length) {
  //   files = <Typography>No Files Found</Typography>;
  // } else {
  //   files = <FileListResults files={file} />;
  // }
  // //Note that this return will replace the working return as
  // //you can only have one return
  // return (
  //   <>{files}</>
  // )

  return (
    <FileListResults files={files} currentpath={currentPath} setFilesSelected={setFilesSelected} setCurrentPath={setCurrentPath} />
  );
}
*/
