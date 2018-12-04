using System.Collections.Generic;

public class TripConfig
{
    public string Name { get; set; }
    public string Origin { get; set; }
    public string Destination { get; set; }
    public List<string> Waypoints { get; set; }
    public int StartHourEst { get; set; }
    public int EndHourEst { get; set; }
}