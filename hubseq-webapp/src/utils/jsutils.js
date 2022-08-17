//
// a bunch of helper and utility functions
//

// adds trailing slash to path if it doesnt have one
export const addTrailingSlash = (s) => {
  return (s && !s.endsWith('/')) ? s+"/" : s;
};

// check if two JSONs are equal
// return true when the two json has same length and all the properties has same value key by key
export const isEqualsJson = function(obj1,obj2){
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  return keys1.length === keys2.length && Object.keys(obj1).every(key=>obj1[key]==obj2[key]);
};

// folders have trailing slash
export const isFolder = (f) => {
  return (f && (typeof f)=="string" && f.endsWith('/')) ? true : false;
};

export const hideRootFolder = function(fullPath, hideSubPath){
  return fullPath.replace(hideSubPath,'');
};

export const notEmpty = function( e ){
  return (e && e!=[] && e!='');
};

export const isDataFile = function( f ){
  if (f && (typeof f)=="string" && !isFolder(f)){
    f = f.toLowerCase();
    return (!f.endsWith('.json') && !f.endsWith('.yaml') && !f.endsWith('.yml')
            && !f.endsWith('.log'));
  } else {
    return false;
  }
};

export const isSequencingFile = function( f ){
  return isFastqFile(f) || isFastaFile(f) || isAlignFile(f) || isBedFile(f);
}

export const isFastqFile = function( f ){
  if (f && (typeof f)=="string" && !isFolder(f)){
    f = f.toLowerCase();
    return (f.endsWith('.fastq') || f.endsWith('.fastq.gz') || f.endsWith('.fq')
           || f.endsWith('.fq.gz') || f.endsWith('.fq.bz2') || f.endsWith('.fastq.bz2')
           || f.endsWith('.fqz'));
  } else {
    return false;
  }
};

export const isFastaFile = function( f ){
  if (f && (typeof f)=="string" && !isFolder(f)){
    f = f.toLowerCase();
    return (f.endsWith('.fasta') || f.endsWith('.fasta.gz') || f.endsWith('.fa')
            || f.endsWith('.fa.gz') || f.endsWith('.fa.bz2') || f.endsWith('.fasta.bz2')
            || f.endsWith('.fqz'));
  } else {
    return false;
  }
};

export const isAlignFile = function( f ){
  if (f && (typeof f)=="string" && !isFolder(f)){
    f = f.toLowerCase();
    return f.endsWith('.sam') || f.endsWith('.bam') || f.endsWith('.cram');
  } else {
    return false;
  }
};

export const isBamFile = function( f ){
  if (f && (typeof f)=="string" && !isFolder(f)){
    f = f.toLowerCase();
    return f.endsWith('.bam') || f.endsWith('.cram');
  } else {
    return false;
  }
};

export const isSamFile = function( f ){
  if (f && (typeof f)=="string" && !isFolder(f)){
    f = f.toLowerCase();
    return f.endsWith('.sam');
  } else {
    return false;
  }
};

export const isBedFile = function( f ){
  if (f && (typeof f)=="string" && !isFolder(f)){
    f = f.toLowerCase();
    return (f.endsWith('.bed') || f.endsWith('.bed.gz') || f.endsWith('.bed.bz2')
             || f.endsWith('.bigbed') || f.endsWith('.bigbed.gz') || f.endsWith('.bigbed.bz2')
             || f.endsWith('.bedgraph') || f.endsWith('.bedgraph.gz') || f.endsWith('.bedgraph.bz2'));
  } else {
    return false;
  }
};
