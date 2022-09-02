import axios from "axios";
import React from "react";
import { awsPipelineAPI_POST } from '../../../utils/aws-session';

const formatResponse_runPipeline = function( response_raw ){
  let response = {"data": []};
  response.data = response_raw.data;
  return response
}

const formatModulesInput = function(pipeline, modules, params, altinputs, altoutputs){
  let modulesOut = [];
  let paramsOut = [];
  let altinputsOut = [];
  let altoutputsOut = [];
  for (let key in modules){
    modulesOut.push(modules[key]);
    paramsOut.push((key in params) ? params[key] : "''");
    altinputsOut.push((key in altinputs) ? altinputs[key] : "''");
    altoutputsOut.push((key in altoutputs) ? altoutputs[key] : "''");
    // always run DE QC after Differential expression (DE QC not specified on frontend)
    if (key=="Differential Expression"){
      modulesOut.push('deqc');
      paramsOut.push((key in params) ? params[key] : "''");
      altinputsOut.push((key in altinputs) ? altinputs[key] : "''");
      altoutputsOut.push((key in altoutputs) ? altoutputs[key] : "''");
    // always run GO QC after Gene Ontology (GO QC not specified on frontend)
    } else if (key=="Gene Ontology"){
      modulesOut.push('goqc');
      paramsOut.push((key in params) ? params[key] : "''");
      altinputsOut.push((key in altinputs) ? altinputs[key] : "''");
      altoutputsOut.push((key in altoutputs) ? altoutputs[key] : "''");
    }
  }
  return [modulesOut, paramsOut, altinputsOut, altoutputsOut];
}

const formatRunPipelineBody = function(pipeline, modules, inputFiles, altInputFiles, altOutputFiles, moduleParams, runid, timenow){
  // assumes files args are arrays
  // test case
  //return {
  //    "pipeline": "rnaseq:mouse",
  //    "modules": "deseq2,deqc,david_go,goqc"
  //    "input": "hubseq/test/runs/test-20220714-1633/expressionqc/expressionqc.counts_matrix.column.csv",
  //    "altinputs": "'<team_id>/<user_id>/runs/<run_id>/expressionqc/expressionqc.samplegroups.csv','','',''"
  //    "moduleargs": "'','-pvaluecolumn pvalue','-cond pvalue<0.5,log2FoldChange>0.5',''",
  //    "teamid": "hubseq",
  //    "userid": "test",
  //    "runid": "test-20220714-1633"
  //}
  const [modulesOut, paramsOut, altinputsOut, altoutputsOut] = formatModulesInput(pipeline, modules, moduleParams, altInputFiles, altOutputFiles);
  return {"pipeline": pipeline,
          "modules": modulesOut.join(","),
          "input": inputFiles.join(","),
          "altinputs": altinputsOut.join(","),
          "altoutputs": altoutputsOut.join(","),
          "moduleargs": paramsOut.join(","),
          "runid": runid,
          "submitted": timenow
          }
}

export async function runPipelineCall(pipeline, modules, inputFiles, altInputFiles, altOutputFiles, moduleParams, runid, timenow, idToken) {

  const body = formatRunPipelineBody(pipeline, modules, inputFiles, altInputFiles, altOutputFiles, moduleParams, runid, timenow);
  console.log('BODY BODY: ', body);
  // const response_raw = await client.request({"data": body});
  const response_raw = await awsPipelineAPI_POST(body, '/test_cors/batchpipeline', idToken);
  console.log('RESPONSE RAW', response_raw);
  const response = formatResponse_runPipeline(response_raw);
  console.log('RESPONSE AFTER: ', response);

  return response.data;
}
