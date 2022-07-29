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

  React.useEffect(() => {
    async function getFile() {
      const body = {"path": "s3://www.hubseq.com/assets/"};
      const response = await client.request({"data": body});
      // console.log(response.data["Contents"]);
      response.data["Contents"].forEach((e, idx) => e["id"] = idx) // add an id
      setFile(response.data["Contents"]);
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
