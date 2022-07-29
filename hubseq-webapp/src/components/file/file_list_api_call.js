import axios from "axios";
import React from "react";
import { FileListResults } from './file-list-results';
// import { Typography } from '@mui/material';

const client = axios.create({
  baseURL: "https://cs8ibwdms8.execute-api.us-west-2.amazonaws.com/test_cors/listobjects",
  // url: '/listobjects',
  method: 'POST'
});

export default function FileList() {
  const [file, setFile] = React.useState([]);
  const [path, setPath] = React.useState()
  React.useEffect(() => {
    async function getFile() {
      const body = {"path": "s3://www.hubseq.com/assets/"};
      const response_raw = await client.request({"data": body});
      console.log(response_raw);
      const _addKeys = function(e, idx){
        e["id"] = idx;
        e["Key"] = e["Prefix"] // .split('/').pop();
        e["LastModified"] = "-";
        e["Size"] = 0;
        return e
      }
      let num_folders = 0;
      let response = {"data": []}

      num_folders = response_raw.data.hasOwnProperty("CommonPrefixes") ? response_raw.data["CommonPrefixes"].length : 0;
      // add a few keys to raw response
      response_raw.data["CommonPrefixes"].forEach((e, idx) => _addKeys(e, idx));
      response_raw.data["Contents"].forEach((e, idx) => e["id"] = num_folders+idx);
      // add folders to final response data first
      response.data = response_raw.data.hasOwnProperty("CommonPrefixes") ? response_raw.data["CommonPrefixes"] : [];
      // then add files
      response.data = response.data.concat( response_raw.data["Contents"] );
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
    <FileListResults files={file} />
  );
}
