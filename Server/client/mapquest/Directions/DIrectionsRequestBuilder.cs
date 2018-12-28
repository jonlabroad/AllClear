using System.Collections.Generic;
using System.Linq;
using System.Web;
using RestSharp;

namespace client.mapquest.directions
{
    public class DirectionsRequestBuilder
    {
        public IRestRequest GenerateDirectionsRequest(string source, string destination, List<string> waypoints)
        {
            var resource = $"directions/v2/route?{GetParams(source, destination, waypoints)}";
            return new RestRequest(resource, Method.GET);
        }

        private string GetParams(string source, string destination, List<string> waypoints)
        {
            return $"from={source}&to={destination}&key={GlobalConfig.CloudAppConfig.MapquestApiKey}&routeType=shortest&doReverseGeocode=false&narrativeType=none&manMaps=false";
        }
    }
}