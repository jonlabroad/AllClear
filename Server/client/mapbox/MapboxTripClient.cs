using System;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class MapboxTripClient : ITripDataClient
{
    public bool IsMaster { get; set; } = true;

    public async Task<TripData> GetTripData(TripConfig config)
    {
        var rawResult = await new client.mapbox.DirectionsClient(new RequestExecutor(GlobalConfig.MapBoxBaseUrl)).GetDirections(config.Origin, config.Destination, config.Waypoints);
        Console.WriteLine(JsonConvert.SerializeObject(rawResult));
        var data = TripDataTransformer.Transform(config.Name, rawResult);
        return data;
    }
}