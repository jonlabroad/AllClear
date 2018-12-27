using System.Collections.Generic;
using System.Linq;
using System.Web;
using RestSharp;

public class MatrixRequestBuilder
{
    public IRestRequest GenerateMatrixRequest(string source, string destination, List<string> waypoints)
    {
        var waypointParam = GetWaypoints(source, destination, waypoints);
        var resource = $"directions-matrix/v1/mapbox/driving/{waypointParam}?access_token={GlobalConfig.CloudAppConfig.MapBoxApiKey}";
        return new RestRequest(resource, Method.GET);
    }

    private string GetWaypoints(string source, string destination, List<string> waypoints)
    {
        var allPts = waypoints.Prepend(source).Append(destination);
        var waypts = string.Join(";", allPts.Select(w => PrepareWaypoint(w)));
        return waypts;
    }

    private string PrepareWaypoint(string waypoint)
    {
        var toks = waypoint.Split(",");
        var reversed = $"{toks[1].Trim()},{toks[0].Trim()}";
        return reversed;
    }
}