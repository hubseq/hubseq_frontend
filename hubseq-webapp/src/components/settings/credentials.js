import * as AWS from 'aws-sdk';

export const getCredentials = (jwtToken, userPool) => {
  const idenPoolId = 'us-west-2:51196d02-5075-4e91-8a8a-34a72fb1feec';
  AWS.config.region = 'us-west-2';
  const region = 'us-west-2'; // idenPoolId.split(":")[0];
  const provider = "cognito-idp." + region + ".amazonaws.com/" + userPool;
  let login = {};
  let credentials = null;

  login[provider] = jwtToken;

  // Add the User's Id Token to the Cognito credentials login map.
  credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: idenPoolId,
                Logins: login
                });

  //call refresh method in order to authenticate user and get new temp credentials
  credentials.get((error) => {
    if (error) {
      console.error(error);
      //let response = {
      //  statusCode: 500,
      //  body: JSON.stringify(error)
      //};
      return null;
    } else {
      console.log('Successfully logged!');
      console.log('AKI:'+ credentials.accessKeyId);
      console.log('AKS:'+ credentials.secretAccessKey);
      console.log('token:' + credentials.sessionToken);

      const response = JSON.stringify({
                       'AKI': credentials.accessKeyId,
                       'AKS': credentials.secretAccessKey,
                       'token': credentials.sessionToken
                       });

      return response;
    }
  });
};
