export default class Config {
    public static trafficTableName: string = "AllClearTripData";
    public static trafficAverageTableName: string = "AllClearTripAverages";

    // AWS
    public static awsRegion: string = "us-east-1"; // Bleh, won't read my user config for some reason
    public static identityPoolId: string = "us-east-1:1ecd7146-f11b-496c-9429-eaf5401b6be7";
    public static identityClientId: string = "2109c46prdq3eb4rq8ei9n0907";

    public static timezone: string = "America/New_York";

    public static tripNames = ["Home", "Work", "Work: Burl Exit"];
}