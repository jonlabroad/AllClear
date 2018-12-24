using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;

public class DynamoDbReader
{
    private AmazonDynamoDBClient _client;
    private string _tableName;

    public DynamoDbReader(string tableName)
    {
        _client = new AmazonDynamoDBClient(GlobalConfig.AwsRegion);
        _tableName = tableName;
    }

    public async Task<List<TripData>> ReadDailyData(DateTime date)
    {
        try
        {
            var request = CreateQueryRequest(date);
            var response = await _client.QueryAsync(request);
            var data = response.Items.Select(item => TripDataTransformer.Transform(item)).ToList(); ;
            return data;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
        }
        return new List<TripData>();
    }

    private QueryRequest CreateQueryRequest(DateTime date)
    {
        var request = new QueryRequest
        {
            TableName = _tableName,
            KeyConditionExpression = "CalendarDate = :v_CalendarDate",
            ExpressionAttributeValues = new Dictionary<string, AttributeValue> {
                {":v_CalendarDate", new AttributeValue { N = Date.GetCalendarDate(date) }}
            }
        };
        return request;
    }
}