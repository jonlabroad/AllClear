import TrafficAvgElement from "./TrafficAvgElement";
import SingleTripAvgData from "./SingleTripAvgData";

export default class TrafficAvgData
{
    public data : Map<string, SingleTripAvgData>;

    constructor() {
        this.data = new Map<string, SingleTripAvgData>();
    }
}