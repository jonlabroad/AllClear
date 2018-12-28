using System;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class MapquestTripClient : ITripDataClient
{
    public bool IsMaster { get; set; } = false;

    public async Task<TripData> GetTripData(TripConfig config)
    {
        var rawResult = await new client.mapquest.directions.DirectionsClient(new RequestExecutor(GlobalConfig.MapquestBaseUrl)).GetDirections(config.Origin, config.Destination, config.Waypoints);
        var data = TripDataTransformer.Transform(config.Name, rawResult);
        return data;
    }
}