import axios from "axios";
import React from "react";
import * as path from 'path';
import { awsS3API_GET } from '../../utils/aws-session';

export async function fileDownloadCall(myfile) {
  const response_raw = await awsS3API_GET('/test_cors/'+myfile);
  return response_raw.data;
}
