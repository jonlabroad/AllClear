using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public class DirectionsClient
{
    IRequestExecutor _requestExecutor;

    public DirectionsClient(IRequestExecutor requestExecutor)
    {
        _requestExecutor = requestExecutor;
    }

    public async Task<DirectionsResponse> GetDirections(string origin, string destination, List<string> waypoints)
    {
        var request = new DirectionsRequestBuilder().GenerateDirectionsRequest(origin, destination, waypoints);
        Console.WriteLine(request.Resource);
        return await _requestExecutor.Execute<DirectionsResponse>(request);
    }
}