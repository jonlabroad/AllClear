import DateUtil from "../util/DateUtil";

export default class TrafficElement
{
    public CalendarDate: string;
    public NameHourMin: string;
    public DataSource: string;
    public DayOfMonth: number;
    public DayOfWeek: string;
    public Factor: number;
    public Hour: number;
    public IdealTime: number;
    public Min: number;
    public Month: number;
    public Name: string;
    public Sec: number;
    public TotalHours: number;
    public TrafficTime: number;
    public UTCSec: number;
    public Year: number;
    public ResponseObject: string;
    public Date: Date;

    constructor(dataItem: AWS.DynamoDB.AttributeMap) {
        var calDate = dataItem["CalendarDate"].N;
        var hour = parseInt(dataItem["Hour"].N);
        var min = parseInt(dataItem["Min"].N);
        this.CalendarDate = calDate;
        this.NameHourMin = dataItem["NameHourMin"].S;
        this.DataSource = dataItem["DataSource"].S;
        this.DayOfMonth = parseInt(dataItem["DayOfMonth"].N);
        this.DayOfWeek = dataItem["DayOfWeek"].S;
        this.Factor = parseFloat(dataItem["Factor"].N);
        this.Hour = hour;
        this.IdealTime = parseInt(dataItem["IdealTime"].N);
        this.Min = min;
        this.Month = parseInt(dataItem["Month"].N);
        this.Name = dataItem["Name"].S;
        this.Sec = parseInt(dataItem["Sec"].N);
        this.TotalHours = parseFloat(dataItem["TotalHours"].N);
        this.TrafficTime = parseInt(dataItem["TrafficTime"].N);
        this.UTCSec = parseInt(dataItem["UTCSec"].N);
        this.Year = parseInt(dataItem["Year"].N);
        this.ResponseObject = dataItem["ResponseObject"].S;
        this.Date = DateUtil.getMoment(calDate, `${DateUtil.numberWith1LeadingZero(hour)}${DateUtil.numberWith1LeadingZero(min)}`);
    }
}