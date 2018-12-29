using System;
using Newtonsoft.Json;

namespace Server
{
    class Program
    {
        static void Main(string[] args)
        {
            // new CloudAppConfigProvider().write(GlobalConfig.CloudAppConfig).Wait();

            new Poller().Poll().Wait();
            Console.WriteLine("donezo");
        }
    }
}
