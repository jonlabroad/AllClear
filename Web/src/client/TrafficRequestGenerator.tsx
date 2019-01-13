import Config from "../config/Config";
import DateUtil from "../util/DateUtil";
import { QueryInput, Key } from "aws-sdk/clients/dynamodb";

export default class TrafficRequestGenerator {
    constructor() {
    }

    public static generateQuery(calendarDate : string) : QueryInput {
        var request : any = {
            TableName: `${Config.trafficTableName}`,
            ExpressionAttributeValues: {
                ":v1": {
                    N: `${parseInt(calendarDate)}`
                }
            },
            KeyConditionExpression: "CalendarDate = :v1",
            Limit: 10000
        };
        return request;
    }

    public static generateAvgQuery(calendarDate : string, tripName: string, lastEvaluatedKey: Key) : QueryInput {
        var dayOfWeek = DateUtil.getDayOfWeekString(calendarDate);
        var key = `${tripName}${dayOfWeek}`;
        var request : QueryInput = {
            TableName: `${Config.trafficAverageTableName}`,
            ExpressionAttributeValues: {
                ":v1": {
                    S: `${key}`
                }
            },
            KeyConditionExpression: "NameDayOfWeek = :v1",
            ExclusiveStartKey: lastEvaluatedKey,
            Limit: 10000
        };
        return request;
    }
}