using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class Poller
{
    public void Poll()
    {
        var clients = new List<ITripDataClient>
        {
            new MapboxTripClient(),
            new MapquestTripClient()
        };

        var tasks = new List<Task>();
        foreach (var client in clients)
        {
            foreach (var trip in GlobalConfig.CloudAppConfig.Trips)
            {
                var task = Poll(trip, client);
                tasks.Add(task);
            }
        }
        Task.WhenAll(tasks);
    }

    private async Task Poll(TripConfig tripConfig, ITripDataClient client)
    {
        if (IsTimeToPoll(tripConfig))
        {
            var data = await client.GetTripData(tripConfig);
            await new DynamoDbWriter(GlobalConfig.DbTableName).WriteData(data);
            if (client.IsMaster)
            {
                var results = new AllTripStatus()
                {
                    results = new List<TripStatus>()
                };

                results.results.Add(new TripStatus()
                {
                    name = tripConfig.Name,
                    date = data.CalendarDate,
                    idealTimeSec = data.IdealTime,
                    travelTimeSec = data.TrafficTime,
                    factor = (double)data.TrafficTime / data.IdealTime
                });
                await new S3JsonWriter("allclearcache").write("response.json", results);
            }

        }

    }

    private bool IsTimeToPoll(TripConfig trip)
    {
        var nowEst = Date.ConvertDateToEst(DateTime.UtcNow);
        return nowEst.Hour >= trip.StartHourEst && nowEst.Hour <= trip.EndHourEst;
    }
}