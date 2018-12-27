using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace client.mapbox
{
    public class DirectionsClient
    {
        IRequestExecutor _requestExecutor;

        public DirectionsClient(IRequestExecutor requestExecutor)
        {
            _requestExecutor = requestExecutor;
        }

        public async Task<DirectionsResponse> GetDirections(string source, string destination, List<string> waypoints)
        {
            var request = new DirectionsRequestBuilder().GenerateDirectionsRequest(source, destination, waypoints);
            Console.WriteLine(request.Resource);
            return await _requestExecutor.Execute<DirectionsResponse>(request);
        }
    }
}