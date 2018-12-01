using System.Web;
using RestSharp;

public class DirectionsRequestBuilder
{
    public IRestRequest GenerateDirectionsRequest(string origin, string destination)
    {
        var resource = $"maps/api/directions/json?origin={HttpUtility.UrlEncode(origin)}&destination={HttpUtility.UrlEncode(destination)}&departure_time=now&key={GlobalConfig.CloudAppConfig.GoogleApiKey}";
        return new RestRequest(resource, Method.GET);
    }
}