import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: "us-west-2_w0jdawN5J",
  ClientId: "6mnd7oi49ofjnn9d1vek2va24f"
};

export default new CognitoUserPool(poolData);
