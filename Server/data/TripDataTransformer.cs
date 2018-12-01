using System;

public class TripDataTransformer
{
    public static TripData Transform(string name, DirectionsResponse directions)
    {
        var duration = directions.routes[0].legs[0].duration.value; 
        var trafficDuration = directions.routes[0].legs[0].duration_in_traffic.value; 
        var nowUtc = DateTime.UtcNow;
        var nowEst = Date.ConvertDateToEst(nowUtc);
        var data = new TripData();
        data.CalendarDate = Date.GetCalendarDate(nowEst);
        data.NameHourMin = $"{name}{nowEst.Hour}{nowEst.Minute}";
        data.DataSource = "Google";
        data.DayOfMonth = nowEst.Day;
        data.DayOfWeek = nowEst.DayOfWeek.ToString().Substring(0,3);
        data.Factor = (double) trafficDuration / duration;
        data.Hour = nowEst.Hour;
        data.IdealTime = duration;
        data.Min = nowEst.Minute;
        data.Month = nowEst.Month;
        data.Name = name;
        data.Sec = nowEst.Second;
        data.TotalHours = nowEst.Hour + nowEst.Minute / 60.0 + nowEst.Second / 3600.0;
        data.TrafficTime = trafficDuration;
        data.UTCSec = new DateTimeOffset(nowUtc).ToUnixTimeSeconds();
        data.Year = nowEst.Year;
        return data;
    }
}