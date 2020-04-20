import * as AWS from "aws-sdk";
import Config from "../config/Config";
import Amplify, { Auth } from 'aws-amplify';

export default class Credentials
{
    public async init() {
        AWS.config.update({region: `${Config.awsRegion}`});
        AWS.config.credentials = await Auth.currentCredentials();
        //this.SetCognitoCredentials();
    }
}