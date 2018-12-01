using System.Collections.Generic;

public class CloudAppConfig {
    public string GoogleApiKey {get; set;} = "";
    public List<TripConfig> Trips { get; set; }
}