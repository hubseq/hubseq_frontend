import * as AWS from 'aws-sdk';

export const getCredentials = (jwtToken, userPool) => {
  const idenPoolId = 'us-west-2:51196d02-5075-4e91-8a8a-34a72fb1feec';
  AWS.config.region = 'us-west-2';
  const region = 'us-west-2'; // idenPoolId.split(":")[0];
  const provider = "cognito-idp." + region + ".amazonaws.com/" + userPool;
  let login = {};
  let credentials = null;

  login[provider] = jwtToken;

  //call refresh method in order to authenticate user and get new temp credentials
  // Add the User's Id Token to the Cognito credentials login map.
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: idenPoolId,
                Logins: login
                });

  // get credentials from cognito
  return new Promise(function(resolve, reject){
    AWS.config.getCredentials((err) => {
    if (err) {
        reject(err);
    } else {
        alert('Successfully logged!');
        resolve(JSON.stringify({
                         'AKI': AWS.config.credentials.accessKeyId,
                         'AKS': AWS.config.credentials.secretAccessKey,
                         'token': AWS.config.credentials.sessionToken
                }));
    }});
  });
};
