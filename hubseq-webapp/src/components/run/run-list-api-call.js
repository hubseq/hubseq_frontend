import axios from "axios";
import React from "react";
import { RunListResults } from './run-list-results';
// import { Typography } from '@mui/material';

const client = axios.create({
  baseURL: "https://cs8ibwdms8.execute-api.us-west-2.amazonaws.com/test_cors/gettable",
  // url: '/listobjects',
  method: 'POST'
});

const _addKeys = function(e, idx){
  e["id"] = idx;
  return e
}

const formatResponse_RunList = function( response_raw ){
  let response = {"data": []};

  // add a few keys to raw response
  response_raw.data[0].forEach((e, idx) => e["id"] = idx);
  // add folders to final response data first
  response.data = response_raw.data[0];
  return response
}

export default function RunList() {
  const [run, setRun] = React.useState([]);

  React.useEffect(() => {
    async function getRun() {
      const body = {"userid": "testuser1", "teamid": "hubseq", "table": "runs"};
      const response_raw = await client.request({"data": body});
      console.log(response_raw);

      const response = formatResponse_RunList(response_raw)
      console.log(response);

      setRun(response.data);
      // setRun([response.data]);
    }
    getRun();
  }, []);


  // //Example of conditional rendering
  // let Runs;
  // if (!Run.length) {
  //   Runs = <Typography>No Runs Found</Typography>;
  // } else {
  //   Runs = <RunListResults Runs={Run} />;
  // }
  // //Note that this return will replace the working return as
  // //you can only have one return
  // return (
  //   <>{Runs}</>
  // )

  return (
    <RunListResults runs={run} />
  );
}
