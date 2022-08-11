import axios from "axios";
import React from "react";
import { RunListResults } from './run-list-results';
// import { Typography } from '@mui/material';
import { awsPipelineAPI_POST } from '../../utils/aws-session';

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

export default function RunList({setRunsSelected, setRunInfo}) {
  const [run, setRun] = React.useState([]);
  const teamid = "tranquis"; // get from session variable later
  const userid = "testuser1"; // get from session variable later

  // anti-pattern - use function for API call instead
  React.useEffect(() => {
    async function getRun() {
      const body = {"userid": userid, "teamid": teamid, "table": "runs"};
      // const response_raw = await client.request({"data": body});
      const response_raw = await awsPipelineAPI_POST(body, '/test_cors/gettable');
      console.log(response_raw);

      const response = formatResponse_RunList(response_raw)
      console.log(response);

      setRun(response.data);
      setRunInfo(response.data);
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
    <RunListResults runs={run} setRunsSelected={setRunsSelected} />
  );
}
