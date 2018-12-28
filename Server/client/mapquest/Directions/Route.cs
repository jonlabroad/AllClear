using System.Collections.Generic;

namespace client.mapquest.directions
{
    public class Route
    {
        public double distance { get; set; }
        public int realTime { get; set; }
        public int time { get; set; }
        public List<Leg> legs { get; set; }
        public string formattedTime { get; set; }
        public string origNarrative { get; set; }
    }

}
