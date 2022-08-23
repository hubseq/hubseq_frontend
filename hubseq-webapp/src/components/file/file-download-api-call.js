import axios from "axios";
import React from "react";
import * as path from 'path';
import { awsS3API_GET } from '../../utils/aws-session';

export async function fileDownloadCall(myfiles, idToken) {
  let response_raw;
  for (let i=0;i<myfiles.length;i++){
    response_raw = await awsS3API_GET('/test/'+myfiles[i], idToken);
    // stream the actual data to a file somehow...
  }
  console.log('file download response raw: ', response_raw);
  return response_raw.data;
}
