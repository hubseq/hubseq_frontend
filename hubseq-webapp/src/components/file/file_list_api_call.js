import axios from "axios";
import React from "react";
import { FileListResults } from './file-list-results';
// import { Typography } from '@mui/material';

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/posts" 
});

export default function FileList() {
  const [file, setFile] = React.useState([]);

  React.useEffect(() => {
    async function getFile() {
      const response = await client.get("/1");
      setFile([response.data]);
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