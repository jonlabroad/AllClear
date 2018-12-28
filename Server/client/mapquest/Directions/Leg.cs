using System.Collections.Generic;

namespace client.mapquest.directions
{
    public class Leg
    {
        public bool hasHighway { get; set; }
        public double distance { get; set; }
        public int time { get; set; }
        public List<Maneuver> maneuvers { get; set; }
    }

}
