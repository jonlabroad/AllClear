using System;
using System.Collections.Generic;
using Newtonsoft.Json;

public class Poller
{
    public void Poll()
    {
        var results = new AllTripStatus()
        {
            results = new List<TripStatus>()
        };

        foreach (var trip in GlobalConfig.CloudAppConfig.Trips)
        {
            if (IsTimeToPoll(trip))
            {
                // var rawResult = new DirectionsClient(new RequestExecutor(GlobalConfig.GoogleMapsBaseUrl)).GetDirections(trip.Origin, trip.Destination, trip.Waypoints).Result;
                var rawResult = new client.mapbox.DirectionsClient(new RequestExecutor(GlobalConfig.MapBoxBaseUrl)).GetDirections(trip.Origin, trip.Destination, trip.Waypoints).Result;
                Console.WriteLine(JsonConvert.SerializeObject(rawResult));
                var data = TripDataTransformer.Transform(trip.Name, rawResult);
                new DynamoDbWriter(GlobalConfig.DbTableName).WriteData(data).Wait();
                results.results.Add(new TripStatus()
                {
                    name = trip.Name,
                    date = data.CalendarDate,
                    idealTimeSec = data.IdealTime,
                    travelTimeSec = data.TrafficTime,
                    factor = (double) data.TrafficTime / data.IdealTime
                });
                new S3JsonWriter("allclearcache").write("response.json", results).Wait();
            }
        }
    }

    private bool IsTimeToPoll(TripConfig trip)
    {
        var nowEst = Date.ConvertDateToEst(DateTime.UtcNow);
        return nowEst.Hour >= trip.StartHourEst && nowEst.Hour <= trip.EndHourEst;
    }
}