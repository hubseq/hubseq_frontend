//
// Functions for interfacing with AWS
// to consolidate session-specific functions into one file
//
import * as awsApiGatewayClient from "aws-api-gateway-client";

export const awsPipelineAPI_POST = function(body, pathTemplate, idToken, ...rest){
  let apigClientFactory = awsApiGatewayClient.default;
  let apigClient = apigClientFactory.newClient({
    invokeUrl: "https://cs8ibwdms8.execute-api.us-west-2.amazonaws.com",
    region: "us-west-2",
  });

  let pathParams = {};
  // let pathTemplate = '/test_cors/batchpipeline';
  let method = 'POST';
  let additionalParams = {
    headers: {
      'Authorization': idToken,
      'Content-Type': 'application/json'
    },
  };

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

export const awsS3API_GET = function( pathTemplate, idToken, ...rest){
  let apigClientFactory = awsApiGatewayClient.default;
  let apigClient = apigClientFactory.newClient({
    invokeUrl: "https://ozfjxlaivl.execute-api.us-west-2.amazonaws.com",
    region: "us-west-2",
  });

  let pathParams = {};
  let method = 'GET';
  let additionalParams = {
    headers: {
      'Authorization': idToken,
      'Content-Type': 'application/octet-stream',
      'Accept': '*/*'
    },
  };

  // this looks messy - maybe need to clean up this code
  return new Promise(function(resolve, reject){
    apigClient.invokeApi(pathParams, pathTemplate, method, additionalParams)
    .then(function(result){
      resolve(result);
    }).catch( function(err){
      reject(err);
    });
  });
};
