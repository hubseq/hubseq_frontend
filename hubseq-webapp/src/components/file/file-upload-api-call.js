import axios from "axios";
import React from "react";
import * as path from 'path';
import { awsS3API_PUT } from '../../utils/aws-session';

export async function fileUploadCall(myfile, fileObj, idToken) {
  // const formData = new FormData();
  // formData.append('file', fileContents.stream());
  // let fileContents = await fileObj.arrayBuffer();
  let fileContents = await fileObj.text();
  console.log('FILE CONTENTS: ', fileContents);
  const response_raw = await awsS3API_PUT('/test/'+myfile, fileContents, idToken);
  console.log('file upload response raw: ', response_raw);
  return response_raw;
}
