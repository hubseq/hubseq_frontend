import axios from "axios";
import React from "react";
import * as awsApiGatewayClient from "aws-api-gateway-client";

const awsCall_RunModule = function(body){
  let apigClientFactory = awsApiGatewayClient.default;
  let apigClient = apigClientFactory.newClient({
    invokeUrl: "https://cs8ibwdms8.execute-api.us-west-2.amazonaws.com",
    region: "us-west-2",
    accessKey: "access key here",
    secretKey: "secret key here",
    sessionToken: "session token here"
  });

  let pathParams = {};
  let pathTemplate = '/test_cors/batchjob';
  let method = 'POST';
  let additionalParams = {};

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
  baseURL: "https://cs8ibwdms8.execute-api.us-west-2.amazonaws.com/test_cors/batchjob",
  // url: '/listobjects',
  method: 'POST'
});

const _addKeys = function(e, idx){
  e["id"] = idx;
  return e
}

const formatResponse_runModule = function( response_raw ){
  let response = {"data": []};
  response.data = response_raw.data;
  return response
}

const formatRunModuleBody = function(mymodule, inputFiles, outputFiles, altInputFiles, altOutputFiles, moduleParams, runid, teamid, userid, timenow){
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
          "teamid": teamid,
          "userid": userid,
          "submitted": timenow
          }
}

export async function runModuleCall(mymodule, inputFiles, outputFiles, altInputFiles, altOutputFiles, moduleParams, runid, teamid, userid, timenow) {

  const body = formatRunModuleBody(mymodule, inputFiles, outputFiles, altInputFiles, altOutputFiles, moduleParams, runid, teamid, userid, timenow);
  console.log('BODY BODY: ', body);
  // const response_raw = await client.request({"data": body});
  const response_raw = await awsCall_RunModule(body);
  console.log('RESPONSE RAW', response_raw);
  const response = formatResponse_runModule(response_raw);
  console.log('RESPONSE AFTER: ', response);

  return response.data;
}
