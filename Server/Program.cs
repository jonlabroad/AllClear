using System;

namespace Server
{
    class Program
    {
        static void Main(string[] args)
        {
            PollingLambda test = null;
            new Poller().Poll();
            Console.WriteLine("donezo");
        }
    }
}
