import axios from "axios";
import React from "react";
import { awsPipelineAPI_POST } from '../../../utils/aws-session';
import { addTrailingSlash } from '../../../utils/jsutils';

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
    // add a few default params for some modules
    if (key=="Clustering QC"){
      modulesOut.push(modules[key]);
      paramsOut.push((key in params && params[key]!='') ? "'"+params[key]+"-qconly"+"'" : "'-qconly'");
      altinputsOut.push((key in altinputs && altinputs[key]!='') ? "'"+altinputs[key]+"'" : "''");
      altoutputsOut.push((key in altoutputs && altoutputs[key]!='') ? "'"+altoutputs[key]+"'" : "''");
    } else {
      modulesOut.push(modules[key]);
      paramsOut.push((key in params && params[key]!='') ? "'"+params[key]+"'" : "''");
      altinputsOut.push((key in altinputs && altinputs[key]!='') ? "'"+altinputs[key]+"'" : "''");
      altoutputsOut.push((key in altoutputs && altoutputs[key]!='') ? "'"+altoutputs[key]+"'" : "''");
    }
    // ADDITIONAL modules to run
    // always run DE QC after Differential expression (DE QC not specified on frontend)
    if (key=="Differential Expression"){
      modulesOut.push('deqc');
      paramsOut.push((key in params && params[key]!='') ? "'"+params[key]+"'" : "''");
      altinputsOut.push((key in altinputs && altinputs[key]!='') ? "'"+altinputs[key]+"'" : "''");
      altoutputsOut.push((key in altoutputs && altoutputs[key]!='') ? "'"+altoutputs[key]+"'" : "''");
    // always run GO QC after Gene Ontology (GO QC not specified on frontend)
    } else if (key=="Gene Ontology"){
      modulesOut.push('goqc');
      paramsOut.push("''");
      altinputsOut.push("''");
      altoutputsOut.push("''");
      //paramsOut.push((key in params && params[key]!='') ? "'"+params[key]+"'" : "''");
      //altinputsOut.push((key in altinputs && altinputs[key]!='') ? "'"+altinputs[key]+"'" : "''");
      //altoutputsOut.push((key in altoutputs && altoutputs[key]!='') ? "'"+altoutputs[key]+"'" : "''");
    }
  }
  return [modulesOut, paramsOut, altinputsOut, altoutputsOut];
}

const formatInput = function(modulesOut, inputFiles){
  //const cellrangerIndex = modulesOut.indexOf("cellranger");
  //if (cellrangerIndex == 0){
  //  inputFiles[cellrangerIndex] = "'"+addTrailingSlash(inputFiles[cellrangerIndex])+"**"+"'";
  //}
  return inputFiles
}

const formatRunPipelineBody = function(pipeline, modules, inputFiles, altInputFiles, altOutputFiles, moduleParams, runid, sampleids, timenow){
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
  const inputFilesOut = formatInput(modulesOut, inputFiles);
  return {"pipeline": pipeline,
          "modules": modulesOut.join(","),
          "input": inputFilesOut.join(","),
          "altinputs": altinputsOut.join(","),
          "altoutputs": altoutputsOut.join(","),
          "moduleargs": paramsOut.join(","),
          "runid": runid,
          "submitted": timenow,
          "sampleids": sampleids
          }
}

export async function runPipelineCall(pipeline, modules, inputFiles, altInputFiles, altOutputFiles, moduleParams, runid, sampleids, timenow, idToken) {

  const body = formatRunPipelineBody(pipeline, modules, inputFiles, altInputFiles, altOutputFiles, moduleParams, runid, sampleids, timenow);
  // const response_raw = await client.request({"data": body});
  const response_raw = await awsPipelineAPI_POST(body, '/test_cors/batchpipeline', idToken);
  const response = formatResponse_runPipeline(response_raw);
  return response.data;
}
