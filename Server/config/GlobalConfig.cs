using System.Collections.Generic;
using Amazon;
using Amazon.Runtime;

public class GlobalConfig
{
    public static string ConfigS3Bucket = "allclearconfig";
    public static string DbTableName = "AllClearTripData";
    public static string GoogleMapsBaseUrl = "https://maps.googleapis.com";
    public static string MapBoxBaseUrl = "https://api.mapbox.com";
    public static RegionEndpoint AwsRegion = RegionEndpoint.USEast1;
    public static CloudAppConfig CloudAppConfig = new CloudAppConfigProvider().read().Result;
    public static int HistorySize = 150;
    public static IDictionary<string, double> DefaultMapBoxDurations = new Dictionary<string, double>()
    {
        {"Home", 918.6},
        {"Work", 918.6},
        {"Work: Burl Exit", 457.6}
    };
    
    public static double DefaultMapBoxWorkDuration = 918.6;
}