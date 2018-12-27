using System.Collections.Generic;

public class CloudAppConfig {
    public string GoogleApiKey { get; set; } = "";
    public string MapBoxApiKey { get; set; } = "";
    public List<TripConfig> Trips { get; set; }
}