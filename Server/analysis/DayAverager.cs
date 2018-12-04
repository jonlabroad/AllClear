using System;
using System.Collections.Generic;

public class DayAverager
{
    public void CalculateAveragesAllDays()
    {
        var test = DateTime.Now;
        var allData = new Dictionary<DayOfWeek, MultipleTripDataSet>();
        for (var day = DayOfWeek.Sunday; day <= DayOfWeek.Saturday; day++)
        {
            // MultipleTripDataSet dayAverageData = calculateAverage(day, true);
            // allData[day] = dayAverageData;
        }
        // return allData;
    }
}