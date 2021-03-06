import * as AWS from "aws-sdk";
import Config from "../config/Config";

export default class Credentials
{
    public init() {
        AWS.config.update({region: `${Config.awsRegion}`});
        this.SetCognitoCredentials();
    }

    public SetCognitoCredentials() {
        var creds = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: `${Config.identityPoolId}`
        });
        AWS.config.credentials = creds;    
    }
}