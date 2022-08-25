import axios from "axios";
import React from "react";
import * as path from 'path';
import { awsS3API_GET } from '../../utils/aws-session';

import * as AWS from 'aws-sdk';
import { HttpRequest } from "@aws-sdk/protocol-http";
import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { parseUrl } from "@aws-sdk/url-parser";
import { Sha256 } from "@aws-crypto/sha256-browser";
import { Hash } from "@aws-sdk/hash-node";
import { formatUrl } from "@aws-sdk/util-format-url";

export async function fileDownloadCall(myfile, idToken, setSignedUrl) {
  // first get AWS credentials using the idToken
  AWS.config.region = 'us-west-2';
  const idenPoolId = 'us-west-2:51196d02-5075-4e91-8a8a-34a72fb1feec';
  const userPool = 'us-west-2_w0jdawN5J';
  let region = 'us-west-2'; // idenPoolId.split(":")[0];
  let provider = "cognito-idp." + region + ".amazonaws.com/" + userPool;
  let login = {};
  login[provider] = idToken;
  let credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: idenPoolId,
      Logins: login
  });
  credentials.get((error) => {
    if (error) {
      console.error(error);
      return null;
    } else {
      // after getting credentials for S3, we can get a signed URL for download
      downloadFile( credentials, myfile, setSignedUrl );
    }
  });
}

// get a signed URL for download. Using AWS documentation:
// https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
const downloadFile = async function( credentials, myfile, setSignedUrl ){
  const region = 'us-west-2';
  const s3ObjectUrl = parseUrl(`https://hubtenants.s3.${region}.amazonaws.com/${myfile}`);
  const presigner = new S3RequestPresigner({
      credentials,
      region,
      sha256: Hash.bind(null, "sha256"), // In Node.js
      // sha256: Sha256 // In browsers
  });
  const url = await presigner.presign(new HttpRequest(s3ObjectUrl));
  console.log("PRESIGNED URL: ", formatUrl(url));
  setSignedUrl(formatUrl(url));
  // const response_raw = await fetch(formatUrl(url), { method: "GET" });
  return url;
}
