using System.Collections.Generic;

namespace client.mapbox
{
    public class DirectionsResponse
    {
        public string code { get; set; }
        public string uuid { get; set; }
        public List<Route> routes { get; set; }
        public List<Waypoint> waypoints { get; set; }
    }
}