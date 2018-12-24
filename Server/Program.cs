using System;

namespace Server
{
    class Program
    {
        static void Main(string[] args)
        {
            // new DayAverager().CalculateAveragesAllDays().Wait();
            new Poller().Poll();
            Console.WriteLine("donezo");
        }
    }
}
