import DateUtil from "../util/DateUtil"
import Config from "../config/Config";

export default class TrafficRequestGenerator {
    constructor() {
    }

    public static generateQuery(calendarDate : string) : any {
        var request : any = {
            TableName: `${Config.trafficTableName}`,
            ExpressionAttributeValues: {
                ":v1": {
                    N: `${parseInt(calendarDate)}`
                }
            },
            KeyConditionExpression: "CalendarDate = :v1"
        }
        return request;
    }
}