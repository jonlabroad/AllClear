import * as AWS from "aws-sdk";
import DateUtil from '../util/DateUtil';
import TrafficRequestGenerator from './TrafficRequestGenerator';
import TrafficData from '../data/TrafficData';
import TrafficElement from '../data/TrafficElement';
import Config from "../config/Config";
import TrafficAvgData from "../data/TrafficAvgData";
import TrafficAvgElement from "../data/TrafficAvgElement";
import SingleTripAvgData from "../data/SingleTripAvgData";
import Enumerable from "linq";
import { QueryInput, Key } from "aws-sdk/clients/dynamodb";

export default class TrafficDBReader {
    private dynamoDb: AWS.DynamoDB = new AWS.DynamoDB();

    constructor() {
    }

    public async readToday(): Promise<TrafficData> {
        return await this.readDate(DateUtil.getTodayCalendarDate());
    }

    public async readDate(calendarDate: string) {
        return await this.query(calendarDate);
    }

    public async readAvg(calendarDate: string): Promise<TrafficAvgData> {
        return await this.queryAvg(calendarDate);
    }

    public async query(calendarDate: string): Promise<TrafficData> {
        var request: QueryInput = TrafficRequestGenerator.generateQuery(calendarDate);
        var queryRequest = await this.dynamoDb.query(request).promise();
        return this.processData(queryRequest);
    }

    public async queryAvg(calendarDate: string): Promise<TrafficAvgData> {
        var allItemData: AWS.DynamoDB.Types.QueryOutput[] = [];
        for (var tripIdx in Config.tripNames)
        {
            var lastEvaluatedKey: Key = null;
            do {
                var request: QueryInput = TrafficRequestGenerator.generateAvgQuery(calendarDate, Config.tripNames[tripIdx], lastEvaluatedKey);
                var queryOutput = await this.dynamoDb.query(request).promise();
                allItemData.push(queryOutput);
                lastEvaluatedKey = queryOutput.LastEvaluatedKey;
            } while (lastEvaluatedKey);
        }
        return this.processAvgData(allItemData);
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

    private processAvgData(data: AWS.DynamoDB.Types.QueryOutput[]): TrafficAvgData {
        var allItems = Enumerable.from(data).selectMany(d => d.Items).toArray();
        var processedData: TrafficAvgData = new TrafficAvgData();
        for (var i in allItems) {
            var processedElement = new TrafficAvgElement(allItems[i]);
            if (!processedData.data.has(processedElement.Name)) {
                processedData.data.set(processedElement.Name, new SingleTripAvgData());
            }
            processedData.data.get(processedElement.Name).data.push(processedElement);
        }

        for (var key in processedData.data.keys()) {
            processedData.data.get(key).data.sort(function (d1: TrafficAvgElement, d2: TrafficAvgElement): number { return d1.HourMin.localeCompare(d2.HourMin) });
        }
        return processedData;
    }
}
