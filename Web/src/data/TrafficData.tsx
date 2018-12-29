import TrafficElement from "./TrafficElement";

export default class TrafficData
{
    public data : Map<string, Array<TrafficElement>>;

    constructor() {
        this.data = new Map<string, Array<TrafficElement>>();
    }
}