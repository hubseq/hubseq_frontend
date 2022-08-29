//
// Functions for interfacing with AWS
// to consolidate session-specific functions into one file
//
import * as awsApiGatewayClient from "aws-api-gateway-client";

export const awsPipelineAPI_POST = function(body, pathTemplate, idToken, ...rest){
  let apigClientFactory = awsApiGatewayClient.default;
  let apigClient = apigClientFactory.newClient({
    invokeUrl: process.env.NEXT_PUBLIC_PIPELINE_API_URL,
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
    invokeUrl: process.env.S3_API_URL,
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

export const awsS3API_PUT = function( pathTemplate, body, idToken, ...rest){
  let apigClientFactory = awsApiGatewayClient.default;
  let apigClient = apigClientFactory.newClient({
    invokeUrl: process.env.S3_API_URL,
    region: "us-west-2",
  });

  let pathParams = {};
  let method = 'PUT';
  let additionalParams = {
    headers: {
      'Authorization': idToken,
      'Content-Type': 'multipart/form-data',
      'Accept': '*/*'
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
