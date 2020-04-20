import TrafficData from "../data/TrafficData";
import TrafficAvgData from "../data/TrafficAvgData";

export interface DashboardState {
    rawData?: TrafficData;
    avgData?: TrafficAvgData;
}