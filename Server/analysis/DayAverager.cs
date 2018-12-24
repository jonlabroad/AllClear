using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MathNet.Numerics;
using MathNet.Numerics.Interpolation;

public class DayAverager
{
    public async Task CalculateAveragesAllDays()
    {
        var test = DateTime.Now;
        for (var day = DayOfWeek.Sunday; day <= DayOfWeek.Saturday; day++)
        {
            var dayAvg = await CalculateDayAverages(day);
        }
        // return allData;
    }

    private async Task<IDictionary<string, IEnumerable<TripData>>> CalculateDayAverages(DayOfWeek day)
    {
        var keys = GetDatesForDayOfWeek(day);
        var reader = new DynamoDbReader(GlobalConfig.DbTableName);
        var averages = new Dictionary<string, IEnumerable<TripData>>();
        foreach (var key in keys)
        {
            var dayData = await reader.ReadDailyData(key);
            var tripNames = dayData.Select(d => d.Name).Distinct();
            foreach (var trip in tripNames)
            {
                var interpolated = new TripInterpolator().InterpolateData(
                    GlobalConfig.CloudAppConfig.Trips.First(t => t.Name.Equals(trip)),
                    day,
                    dayData.Where(d => d.Name.Equals(trip)));
                    if (interpolated.Count() > 0)
                    {
                        Console.WriteLine($"{Date.GetCalendarDate(key)} {interpolated.First().TotalHours}: {interpolated.First().Factor}");
                    }
                // TODO add to running avg
            }
        }
        return averages;
    }

    private IEnumerable<DateTime> GetDatesForDayOfWeek(DayOfWeek day)
    {
        var keys = new List<DateTime>();

        // Find the start day
        var startDate = Date.ConvertDateToEst(DateTime.UtcNow);
        while (startDate.DayOfWeek != day)
        {
            startDate = startDate.AddDays(-1.0);
        }

        keys.Add(startDate);
        for (int i = 1; i <= GlobalConfig.HistorySize; i++)
        {
            keys.Add(startDate.AddDays(-7 * i));
        }
        return keys;
    }
}