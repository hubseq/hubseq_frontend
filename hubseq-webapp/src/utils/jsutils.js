//
// a bunch of little helper functions
//

// adds trailing slash to path if it doesnt have one
export const addTrailingSlash = (s) => {
  return (s && s.endsWith('/')) ? s : s+"/";
};

// check if two JSONs are equal
// return true when the two json has same length and all the properties has same value key by key
export const isEqualsJson = function(obj1,obj2){
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  return keys1.length === keys2.length && Object.keys(obj1).every(key=>obj1[key]==obj2[key]);
}

// folders have trailing slash
export const isFolder = (f) => {
  return (f && f.endsWith('/')) ? true : false;
}

export const hideRootFolder = function(fullPath, hideSubPath){
  return fullPath.replace(hideSubPath,'');
}

export const notEmpty = function( e ){
  return (e && e!=[] && e!='');
}
