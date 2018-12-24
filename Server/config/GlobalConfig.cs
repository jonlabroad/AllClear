using Amazon;
using Amazon.Runtime;

public class GlobalConfig
{
    public static string ConfigS3Bucket = "allclearconfig";
    public static string DbTableName = "AllClearTripData";
    public static string MapsBaseUrl = "https://maps.googleapis.com";
    public static RegionEndpoint AwsRegion = RegionEndpoint.USEast1;
    public static CloudAppConfig CloudAppConfig = new CloudAppConfigProvider().read().Result;
    public static int HistorySize = 150;
}