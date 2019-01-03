using Amazon.Lambda;
using Amazon.Lambda.Core;

public class PollingLambda
{
    public void Poll(ILambdaContext context)
    {
        var poller = new Poller();
        poller.Poll().Wait();
    }
}