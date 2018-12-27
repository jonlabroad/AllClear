using System.Collections.Generic;
using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;

public class DynamoDbWriter
{
    private AmazonDynamoDBClient _client;
    private string _tableName;

    public DynamoDbWriter(string tableName)
    {
        _client = new AmazonDynamoDBClient(GlobalConfig.AwsRegion);
        _tableName = tableName;
    }

    public async Task WriteData(TripData data)
    {
        var values = new Dictionary<string, AttributeValue>()
        {
            {"CalendarDate", new AttributeValue() { N = data.CalendarDate }},
            {"DataSource", new AttributeValue() { S = data.DataSource }},
            {"DayOfMonth", new AttributeValue() { N = data.DayOfMonth.ToString() }},
            {"DayOfWeek", new AttributeValue() { S = data.DayOfWeek }},
            {"Factor", new AttributeValue() { N = data.Factor.ToString() }},
            {"Hour", new AttributeValue() { N = data.Hour.ToString() }},
            {"IdealTime", new AttributeValue() { N = data.IdealTime.ToString() }},
            {"Min", new AttributeValue() { N = data.Min.ToString() }},
            {"Month", new AttributeValue() { N = data.Month.ToString() }},
            {"Name", new AttributeValue() { S = data.Name }},
            {"NameHourMin", new AttributeValue() { S = data.NameHourMin }},
            {"Sec", new AttributeValue() { N = data.Sec.ToString() }},
            {"TotalHours", new AttributeValue() { N = data.TotalHours.ToString() }},
            {"TrafficTime", new AttributeValue() { N = data.TrafficTime.ToString() }},
            {"UTCSec", new AttributeValue() { N = data.UTCSec.ToString() }},
            {"Year", new AttributeValue() { N = data.Year.ToString() }},
            {"ResponseObject", new AttributeValue() { S = data.ResponseObject }}
        };
        await WriteData(values);
    }

    public async Task WriteData(Dictionary<string, AttributeValue> values)
    {
        var request = new PutItemRequest(_tableName, values);
        await _client.PutItemAsync(request);
    }
}