using System;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class GoogleTripClient : ITripDataClient
{
    public bool IsMaster { get; set; } = false;
    public async Task<TripData> GetTripData(TripConfig config)
    {
        var rawResult = await new DirectionsClient(new RequestExecutor(GlobalConfig.GoogleMapsBaseUrl)).GetDirections(config.Origin, config.Destination, config.Waypoints);
        Console.WriteLine(JsonConvert.SerializeObject(rawResult));
        var data = TripDataTransformer.Transform(config.Name, rawResult);
        return data;
    }
}