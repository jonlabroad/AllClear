using System;
using System.Threading;
using System.Threading.Tasks;
using NLog;
using RestSharp;

public class RequestExecutor : IRequestExecutor
{
    IRestClient _client;
    private Logger _log = LogManager.GetCurrentClassLogger();
    private SemaphoreSlim requestLock = new SemaphoreSlim(100, 100);

    public RequestExecutor(string baseUrl)
    {
        initialize(baseUrl);
    }

    private void initialize(string baseUrl) {
        _client = new RestClient(baseUrl);
    }

    public async Task<T> Execute<T>(IRestRequest request) {
        try
        {
            _log.Info(request.Resource);
            await requestLock.WaitAsync();
            var data = await _client.ExecuteTaskAsync<T>(request);
            requestLock.Release();
            return data.Data;
        }
        catch (Exception ex) {
            _log.Error(ex);
            return default(T);
        }
    }

        public async Task<string> Execute(IRestRequest request) {
        try
        {
            _log.Info(request.Resource);
            await requestLock.WaitAsync();
            var data = await _client.ExecuteTaskAsync(request);
            requestLock.Release();
            return data.Content;
        }
        catch (Exception ex) {
            _log.Error(ex);
            return "";
        }
    }
}
