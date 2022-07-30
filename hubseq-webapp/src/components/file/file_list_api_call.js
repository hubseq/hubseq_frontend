import axios from "axios";
import React from "react";
import { FileListResults } from './file-list-results';
// import { Typography } from '@mui/material';

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

const formatResponse_FileList = function( response_raw ){
  let response = {"data": []};
  let num_folders = 0;

  num_folders = response_raw.data.hasOwnProperty("CommonPrefixes") ? response_raw.data["CommonPrefixes"].length : 0;
  // add a few keys to raw response
  response_raw.data["CommonPrefixes"].forEach((e, idx) => _addKeys(e, idx));
  response_raw.data["Contents"].forEach((e, idx) => e["id"] = num_folders+idx);
  // add folders to final response data first
  response.data = response_raw.data.hasOwnProperty("CommonPrefixes") ? response_raw.data["CommonPrefixes"] : [];
  // then add files
  response.data = response.data.concat( response_raw.data["Contents"] );
  return response
}

export default function FileList({setFilesSelected}) {
  const [file, setFile] = React.useState([]);
  const [path, setPath] = React.useState("s3://www.hubseq.com/assets/");

  React.useEffect(() => {
    async function getFile() {
      const body = {"path": path};
      const response_raw = await client.request({"data": body});
      console.log(response_raw);

      const response = formatResponse_FileList(response_raw)
      console.log(response);

      setFile(response.data);
      // setFile([response.data]);
    }
    getFile();
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
    <FileListResults files={file} currentpath={path} setFilesSelected={setFilesSelected} />
  );
}
