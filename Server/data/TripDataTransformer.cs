using System;
using System.Collections.Generic;
using Amazon.DynamoDBv2.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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
        data.NameHourMin = $"{name}{nowEst.Hour.ToString("D2")}{nowEst.Minute.ToString("D2")}";
        data.DataSource = "Google";
        data.DayOfMonth = nowEst.Day;
        data.DayOfWeek = nowEst.DayOfWeek.ToString().Substring(0, 3);
        data.Factor = (double)trafficDuration / duration;
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
        data.ResponseObject = JsonConvert.SerializeObject(directions);
        return data;
    }

    public static TripData Transform(string name, client.mapbox.DirectionsResponse directions)
    {
        var duration = GlobalConfig.DefaultMapBoxDurations[name];
        var trafficDuration = directions.routes[0].duration;
        var nowUtc = DateTime.UtcNow;
        var nowEst = Date.ConvertDateToEst(nowUtc);
        var data = new TripData();
        data.CalendarDate = Date.GetCalendarDate(nowEst);
        data.NameHourMin = $"{name}{nowEst.Hour.ToString("D2")}{nowEst.Minute.ToString("D2")}";
        data.DataSource = "MapBox";
        data.DayOfMonth = nowEst.Day;
        data.DayOfWeek = nowEst.DayOfWeek.ToString().Substring(0, 3);
        data.Factor = (double)trafficDuration / duration;
        data.Hour = nowEst.Hour;
        data.IdealTime = (int) Math.Round(duration);
        data.Min = nowEst.Minute;
        data.Month = nowEst.Month;
        data.Name = name;
        data.Sec = nowEst.Second;
        data.TotalHours = nowEst.Hour + nowEst.Minute / 60.0 + nowEst.Second / 3600.0;
        data.TrafficTime = (int) Math.Round(trafficDuration);
        data.UTCSec = new DateTimeOffset(nowUtc).ToUnixTimeSeconds();
        data.Year = nowEst.Year;
        data.ResponseObject = JsonConvert.SerializeObject(directions);
        return data;
    }

    public static TripData Transform(IDictionary<string, AttributeValue> item)
    {
        try
        {
            var dataPt = new TripData
            {
                CalendarDate = item["CalendarDate"].S,
                NameHourMin = item["NameHourMin"].S,
                DataSource = item["DataSource"].S,
                DayOfMonth = int.Parse(item["DayOfMonth"].N),
                DayOfWeek = item["DayOfWeek"].S,
                Factor = double.Parse(item["Factor"].N),
                Hour = int.Parse(item["Hour"].N),
                IdealTime = int.Parse(item["IdealTime"].N),
                Min = int.Parse(item["Min"].N),
                Month = int.Parse(item["Month"].N),
                Name = item["Name"].S,
                Sec = int.Parse(item["Sec"].N),
                TotalHours = double.Parse(item["TotalHours"].N),
                TrafficTime = int.Parse(item["TrafficTime"].N),
                UTCSec = double.Parse(item["UTCSec"].N),
                Year = int.Parse(item["Year"].N)
            };
            return dataPt;
        }
        catch (Exception ex)
        {
            return null;
        }
    }
}