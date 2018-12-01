using System.Threading.Tasks;

public class DirectionsClient
{
    IRequestExecutor _requestExecutor;

    public DirectionsClient(IRequestExecutor requestExecutor)
    {
        _requestExecutor = requestExecutor;
    }

    public async Task<DirectionsResponse> GetDirections(string origin, string destination)
    {
        var request = new DirectionsRequestBuilder().GenerateDirectionsRequest(origin, destination);
        return await _requestExecutor.Execute<DirectionsResponse>(request);
    }
}