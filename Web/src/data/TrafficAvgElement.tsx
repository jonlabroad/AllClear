import DateUtil from "../util/DateUtil";

export default class TrafficAvgElement
{
    public DayOfWeek: string;
    public HourMin: string;
    public Factor: number;
    public Hour: number;
    public Min: number;
    public Name: string;
    public Num: number;
    public Sec: number;

    constructor(dataItem: AWS.DynamoDB.AttributeMap) {
        this.DayOfWeek = dataItem["DayOfWeek"].S ?? "";
        this.HourMin = dataItem["HourMin"].N ?? "";
        this.Factor = parseFloat(dataItem["Factor"].N ?? "");
        this.Hour = parseInt(dataItem["Hour"].N ?? "");
        this.Min = parseInt(dataItem["Min"].N ?? "");
        this.Name = dataItem["Name"].S ?? "";
        this.Sec = parseInt(dataItem["Sec"].N ?? "");
        this.Num = parseInt(dataItem["Num"].N ?? "");
    }
}