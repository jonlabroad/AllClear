using System;

namespace Server
{
    class Program
    {
        static void Main(string[] args)
        {
            foreach (var trip in GlobalConfig.CloudAppConfig.Trips)
            {
                var rawResult = new DirectionsClient(new RequestExecutor(GlobalConfig.MapsBaseUrl)).GetDirections(trip.Origin, trip.Destination).Result;
                var data = TripDataTransformer.Transform(trip.Name, rawResult);
                new DynamoDbWriter(GlobalConfig.DbTableName).WriteData(data).Wait();
            }
            Console.WriteLine("donezo");
        }
    }
}
