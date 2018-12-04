using System.Collections.Generic;
using System.Linq;
using System.Web;
using RestSharp;

public class DirectionsRequestBuilder
{
    public IRestRequest GenerateDirectionsRequest(string origin, string destination, List<string> waypoints)
    {
        var waypointParam = GetWaypoints(waypoints);
        var resource = $"maps/api/directions/json?origin={HttpUtility.UrlEncode(origin)}&destination={HttpUtility.UrlEncode(destination)}{waypointParam}&departure_time=now&alternatives=false&key={GlobalConfig.CloudAppConfig.GoogleApiKey}";
        return new RestRequest(resource, Method.GET);
    }

    private string GetWaypoints(List<string> waypoints)
    {
        if (waypoints == null || waypoints.Count <= 0) return "";
        var waypts = string.Join("|", waypoints.Select(w => $"via:{w}").ToArray());
        return $"&waypoints={HttpUtility.UrlEncode(waypts)}";
    }
}