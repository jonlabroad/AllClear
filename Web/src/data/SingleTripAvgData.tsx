import TrafficAvgElement from "./TrafficAvgElement";

export default class SingleTripAvgData
{
    public data : Array<TrafficAvgElement>;

    constructor() {
        this.data = new Array<TrafficAvgElement>();
    }
}