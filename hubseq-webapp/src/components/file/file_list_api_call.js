import { awsPipelineAPI_POST } from '../../utils/aws-session';
import { notEmpty, addTrailingSlash } from '../../utils/jsutils';

const _addKeys = function(e, idx){
  e["id"] = idx;
  e["Key"] = e["Prefix"]; // .split('/').pop();
  e["LastModified"] = "-";
  e["Size"] = 0;
  return e
}

const formatResponse_FileList = function( response_raw, called_path ){
  let response = {"data": []};
  let num_folders = 0;

  // handle folders - add ID
  if (response_raw.data.hasOwnProperty("CommonPrefixes")){
    num_folders = response_raw.data["CommonPrefixes"].length;
    response_raw.data["CommonPrefixes"].forEach((e, idx) => _addKeys(e, idx));
    // add folders to final response data first
    response.data = response_raw.data["CommonPrefixes"];
  }
  // handle files - add ID
  if (response_raw.data.hasOwnProperty("Contents")){
    response_raw.data["Contents"].forEach((e, idx) => e["id"] = num_folders+idx);
    // AWS is weird - sometimes returns the actual path folder (UPDATE: FIXED in Lambda)
    response_raw.data["Contents"] = response_raw.data["Contents"].filter((e) => !addTrailingSlash(called_path).endsWith(e["Key"]));
    // then add files
    response.data = response.data.concat( response_raw.data["Contents"] );
  }
  return response
}

export async function getFileCall( path, idToken, ...searchParams ){
  const body = notEmpty(searchParams) ? {"path": addTrailingSlash(path), "searchpattern": searchParams[0]} : {"path": addTrailingSlash(path)};
  const response_raw = await awsPipelineAPI_POST(body, '/test_cors/listobjects', idToken);
  const response = formatResponse_FileList(response_raw, addTrailingSlash(path));
  return response.data;
};
