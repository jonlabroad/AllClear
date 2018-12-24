using System;
using System.Collections.Generic;
using System.Linq;
using MathNet.Numerics;

public class TripInterpolator
{
    private double _timestep = 0.1;

    public IEnumerable<TripData> InterpolateData(TripConfig trip, DayOfWeek dayOfWeek, IEnumerable<TripData> data)
    {
        var interpolator = Interpolate.CubicSpline(data.Select(d => d.TotalHours), data.Select(d => d.Factor));
        var dataX = data.Select(d => d.TotalHours);
        var startTime = Math.Max(dataX.Min(), trip.StartHourEst);
        var endTime = Math.Min(dataX.Max(), trip.EndHourEst);
        var interpX = CreateX(startTime, endTime);
        var interpXY = interpX.Select(x => new KeyValuePair<double, double>(x, interpolator.Interpolate(x)));
        var interpolatedTripData = interpXY.Select(d => CreatePoint(trip.Name, dayOfWeek, d.Key, d.Value));
        return interpolatedTripData;
    }

    private IEnumerable<double> CreateX(double start, double stop)
    {
        var x = new List<double>();
        for (var d = start; d <= stop; d += _timestep)
        {
            x.Add(d);
        }
        return x;
    }

    private TripData CreatePoint(string tripName, DayOfWeek dayOfWeek, double totalHours, double factor)
    {
        var hour = (int) Math.Floor(totalHours);
        var min = (int) Math.Floor((totalHours - hour) * 60.0);
        var sec = (int) Math.Floor(((totalHours - hour - min) * 3600.0));
        return new TripData
        {
            NameHourMin = "N/A",
            DataSource = "N/A",
            DayOfMonth = -1,
            DayOfWeek = dayOfWeek.ToString().Substring(0, 3),
            Factor = factor,
            Hour = hour,
            IdealTime = -1,
            Min = min,
            Month = -1,
            Name = tripName,
            Sec = sec,
            TotalHours = totalHours,
            TrafficTime = -1,
            UTCSec = 0.0,
            Year = -1
        };
    }
}