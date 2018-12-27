using System.Collections.Generic;

public class MatrixResponse
{
    public string code { get; set; }
    public List<List<double>> durations { get; set; }
    public List<Location> destinations { get; set; }
    public List<Location> sources { get; set; }

}