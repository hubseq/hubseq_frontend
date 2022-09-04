import axios from "axios";
import React from "react";
import { awsPipelineAPI_POST } from '../../../utils/aws-session';
// import * as awsApiGatewayClient from "aws-api-gateway-client";

const _addKeys = function(e, idx){
  e["id"] = idx;
  return e
}

const formatResponse_runModule = function( response_raw ){
  let response = {"data": []};
  response.data = response_raw.data;
  return response
}

const formatRunModuleBody = function(mymodule, inputFiles, outputFiles, altInputFiles, altOutputFiles, moduleParams, runid, timenow){
  // assumes files args are arrays
  // test case
  //return {
  //    "module": "goqc",
  //    "input": "s3://hubseq-data/test/rnaseq/run_test1/david_go/davidgo.goterms.txt",
  //    "output": "s3://hubseq-data/test/rnaseq/run_test1/goqc/",
  //    "sampleid": "goqc_test_lambda_full"
  //}
  return {"module": mymodule,
          "input": inputFiles.join(","),
          "output": outputFiles.join(","),
          "alternate_inputs": altInputFiles.join(","),
          "alternate_outputs": altOutputFiles.join(","),
          "pargs": moduleParams,
          "runid": runid,
          "submitted": timenow
          }
}

export async function runModuleCall(mymodule, inputFiles, outputFiles, altInputFiles, altOutputFiles, moduleParams, runid, timenow, idToken) {

  const body = formatRunModuleBody(mymodule, inputFiles, outputFiles, altInputFiles, altOutputFiles, moduleParams, runid, timenow);
  // const response_raw = await client.request({"data": body});
  // const response_raw = await awsCall_RunModule(body);
  const response_raw = await awsPipelineAPI_POST(body, '/test_cors/batchjob', idToken);
  const response = formatResponse_runModule(response_raw);
  return response.data;
}
