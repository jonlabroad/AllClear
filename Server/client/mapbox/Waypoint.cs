using System.Collections.Generic;

namespace client.mapbox
{
    public class Waypoint
    {
        public double distance { get; set; }
        public string name { get; set; }
        public List<double> location { get; set; }
    }
}