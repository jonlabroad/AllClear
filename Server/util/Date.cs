using System;

public class Date
{
    public static string GetCalendarDate(DateTime date)
    {
        return $"{date.Year}{date.Month.ToString("D2")}{date.Day.ToString("D2")}";
    }

    public static DateTime ConvertDateToEst(DateTime utcDate)
    {
        try {
            return TimeZoneInfo.ConvertTime(utcDate, TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"));
        }
        catch (Exception)
        {
            return  TimeZoneInfo.ConvertTime(utcDate, TimeZoneInfo.FindSystemTimeZoneById("America/New_York"));
        }
    }
}