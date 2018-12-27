using System.Collections.Generic;
using System.Linq;
using System.Web;
using RestSharp;

namespace client.mapbox
{
    public class DirectionsRequestBuilder
    {
        public IRestRequest GenerateDirectionsRequest(string source, string destination, List<string> waypoints)
        {
            var waypointParam = GetWaypoints(source, destination, new List<string>() /* waypoints */);
            var resource = $"directions/v5/mapbox/driving-traffic/{waypointParam}?alternatives=true&access_token={GlobalConfig.CloudAppConfig.MapBoxApiKey}";
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
}