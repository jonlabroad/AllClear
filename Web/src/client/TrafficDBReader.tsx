import * as AWS from 'aws-sdk'
import DateUtil from '../util/DateUtil';
import TrafficRequestGenerator from './TrafficRequestGenerator';
import TrafficData from '../data/TrafficData';
import TrafficElement from '../data/TrafficElement';

export default class TrafficDBReader {
    private dynamoDb: AWS.DynamoDB = new AWS.DynamoDB();

    constructor() {
    }

    public async readToday(): Promise<TrafficData> {
        return await this.query(DateUtil.getTodayCalendarDate());
    }

    public async query(calendarDate: string): Promise<TrafficData> {
        var request: any = TrafficRequestGenerator.generateQuery(calendarDate);
        var queryRequest = await this.dynamoDb.query(request).promise();
        console.log(queryRequest.Items);
        return this.processData(queryRequest);
    }

    private processData(data: AWS.DynamoDB.Types.QueryOutput): TrafficData {
        var processedData: TrafficData = new TrafficData();
        for (var i in data.Items) {
            var processedElement = new TrafficElement(data.Items[i]);
            if (!processedData.data.has(processedElement.Name)) {
                processedData.data.set(processedElement.Name, new Array<TrafficElement>());
            }
            processedData.data.get(processedElement.Name).push(processedElement);
        }

        for (var key in processedData.data.keys()) {
            processedData.data.get(key).sort(function (d1: TrafficElement, d2: TrafficElement): number { return d1.Date.getUTCSeconds() - d2.Date.getUTCSeconds() });
        }
        return processedData;
    }
}
