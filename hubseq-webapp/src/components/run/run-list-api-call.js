import axios from "axios";
import React from "react";
// import { RunListResults } from './run-list-results';
// import { Typography } from '@mui/material';
import { awsPipelineAPI_POST } from '../../utils/aws-session';

const formatResponse_RunList = function( response_raw ){
  let response = {"data": []};

  // add a few keys to raw response
  response_raw.data[0].forEach((e, idx) => e["id"] = idx);
  // add folders to final response data first
  response.data = response_raw.data[0];
  return response
}

export async function getRunsCall(idToken){
  const body = {"table": "runs"};
  const response_raw = await awsPipelineAPI_POST(body, '/test_cors/gettable', idToken);
  const response = formatResponse_RunList(response_raw);
  return response.data;
};

/*
export default function RunList({setRunsSelected, setRunInfo}) {
  const [run, setRun] = React.useState([]);

  // anti-pattern - use function for API call instead
  React.useEffect(() => {
    async function getRun() {
      const body = {"table": "runs"};
      // const response_raw = await client.request({"data": body});
      const response_raw = await awsPipelineAPI_POST(body, '/test_cors/gettable');
      const response = formatResponse_RunList(response_raw)

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
*/
