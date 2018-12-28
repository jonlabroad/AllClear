using System.Threading.Tasks;

public interface ITripDataClient
{
    bool IsMaster { get; set; }
    Task<TripData> GetTripData(TripConfig config);
}