import axios from "axios";
import React from "react";
import * as path from 'path';
import { awsS3API_PUT } from '../../utils/aws-session';

import * as AWS from 'aws-sdk';
import { HttpRequest } from "@aws-sdk/protocol-http";
import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { parseUrl } from "@aws-sdk/url-parser";
import { Sha256 } from "@aws-crypto/sha256-browser";
import { Hash } from "@aws-sdk/hash-node";
import { formatUrl } from "@aws-sdk/util-format-url";

export async function fileUploadCall(myfile, fileObj, idToken) {
  // const formData = new FormData();
  // formData.append('file', fileContents.stream());
  // let fileContents = await fileObj.arrayBuffer();
  // let fileContents = await fileObj.text();
  // console.log('FILE CONTENTS: ', fileContents);
  // const response_raw = await awsS3API_PUT('/test/'+myfile, fileContents, idToken);
  // console.log('file upload response raw: ', response_raw);
  // return response_raw;

  // get AWS credentials using jwt token
  AWS.config.region = 'us-west-2';
  const idenPoolId = process.env.COGNITO_IDENTITY_POOL_ID;
  const userPool = process.env.COGNITO_USER_POOL;
  let region = 'us-west-2'; // idenPoolId.split(":")[0];
  let provider = "cognito-idp." + region + ".amazonaws.com/" + userPool;
  let login = {};
  login[provider] = idToken;
  // Add the User's Id Token to the Cognito credentials login map.
  let credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: idenPoolId,
      Logins: login
  });
  credentials.get((error) => {
    if (error) {
      console.error(error);
      return null;
    } else {
      return uploadFile( credentials, myfile, fileObj);
    }
  });
}

// get a signed URL for upload. Using AWS documentation:
// https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
const uploadFile = async function( credentials, myfile, fileObj ){
  const region = 'us-west-2';
  const s3ObjectUrl = parseUrl(`https://${process.env.HUBSEQ_USER_BUCKET}.s3.${region}.amazonaws.com/${myfile}`);
  const presigner = new S3RequestPresigner({
      credentials,
      region,
      sha256: Hash.bind(null, "sha256"), // In Node.js
      // sha256: Sha256 // In browsers
  });
  const url = await presigner.presign(new HttpRequest({...s3ObjectUrl, method: "PUT"}));
  console.log("PRESIGNED URL: ", formatUrl(url));
  const response_raw = await fetch(formatUrl(url), { method: "PUT", body: fileObj});
  return response_raw;
}