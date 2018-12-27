using System;
using Newtonsoft.Json;

namespace Server
{
    class Program
    {
        static void Main(string[] args)
        {
            // new DayAverager().CalculateAveragesAllDays().Wait();
            // var client = new client.mapbox.DirectionsClient(new RequestExecutor(GlobalConfig.MapBoxBaseUrl));
            // var trip = GlobalConfig.CloudAppConfig.Trips[0];
            // var response = client.GetDirections(trip.Origin, trip.Destination, trip.Waypoints).Result;
            // Console.WriteLine(JsonConvert.SerializeObject(response));
            new Poller().Poll();
            Console.WriteLine("donezo");

        }
    }
}
