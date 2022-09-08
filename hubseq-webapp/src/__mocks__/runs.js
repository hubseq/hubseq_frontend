import { v4 as uuid } from 'uuid';

export const runs = [
  {
    id: uuid(),
    status: 'COMPLETE',
    runDate: 1555016400000,
    runID: 546372,
    pipelineModule: 'FastQC'
  },
  {
    id: uuid(),
    status: 'FAILED',
    runDate: 1555016400000,
    runID: 546372,
    pipelineModule: 'mouse RNA-seq'
  },
  {
    id: uuid(),
    status: 'RUNNING',
    runDate: 1555016400000,
    runID: 546372,
    pipelineModule: 'FastQC'
  },
  {
    id: uuid(),
    status: 'RUNNING',
    runDate: 1555016400000,
    runID: 546372,
    pipelineModule: 'FastQC'
  },
  {
    id: uuid(),
    status: 'FAILED',
    runDate: 1555016400000,
    runID: 546372,
    pipelineModule: 'mouse RNA-seq'
  },
  {
    id: uuid(),
    status: 'COMPLETE',
    runDate: 1555016400000,
    runID: 546372,
    pipelineModule: 'FastQC'
  },
  {
    id: uuid(),
    status: 'COMPLETE',
    runDate: 1555016400000,
    runID: 546372,
    pipelineModule: 'mouse RNA-seq'
  },
  {
    id: uuid(),
    status: 'RUNNING',
    runDate: 1555016400000,
    runID: 546372,
    pipelineModule: 'FastQC'
  },
  {
    id: uuid(),
    status: 'RUNNING',
    runDate: 1555016400000,
    runID: 546372,
    pipelineModule: 'mouse RNA-seq'
  }
];
