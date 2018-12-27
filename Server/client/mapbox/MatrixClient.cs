using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public class MatrixClient
{
    IRequestExecutor _requestExecutor;

    public MatrixClient(IRequestExecutor requestExecutor)
    {
        _requestExecutor = requestExecutor;
    }

    public async Task<MatrixResponse> GetMatrix(string source, string destination, List<string> waypoints)
    {
        var request = new MatrixRequestBuilder().GenerateMatrixRequest(source, destination, waypoints);
        Console.WriteLine(request.Resource);
        return await _requestExecutor.Execute<MatrixResponse>(request);
    }
}