// aws-sdk: aws-sdk-js-2.1173.0 on npm https://www.npmjs.com/package/aws-sdk?activeTab=versions
var AWS = require('aws-sdk');
var cognito_token = 'TOKEN-HERE'

var identity_poolid = 'us-west-2:51196d02-5075-4e91-8a8a-34a72fb1feec'
var user_poolid = 'us-west-2_w0jdawN5J'

function getAccessToken(idToken, idenPoolId, userPool) {
        AWS.config.region = 'us-west-2';
        let region = 'us-west-2'; // idenPoolId.split(":")[0];
        let provider = "cognito-idp." + region + ".amazonaws.com/" + userPool;
        let login = {};

        login[provider] = idToken;

        // Add the User's Id Token to the Cognito credentials login map.
        let credentials = new AWS.CognitoIdentityCredentials({
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

                let response = JSON.stringify({
                    'AKI': credentials.accessKeyId,
                    'AKS': credentials.secretAccessKey,
                    'token': credentials.sessionToken
                });

                return response;
            }
        });
    }

getAccessToken(cognito_token, identity_poolid, user_poolid);
