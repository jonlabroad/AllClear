using System.Collections.Generic;

namespace client.mapquest.directions
{
    public class Maneuver
    {
        public double distance { get; set; }
        public int time { get; set; }
        public string formattedTime { get; set; }
        public List<string> streets { get; set; }
    }

}
