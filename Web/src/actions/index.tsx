import * as constants from '../constants';
import TrafficData from '../data/TrafficData';
import TrafficAvgData from '../data/TrafficAvgData';

export interface UpdateRawTrafficData {
    type: constants.UPDATE_RAW_TRAFFIC_DATA;
    rawData: TrafficData;
}

export interface UpdateAvgTrafficData {
    type: constants.UPDATE_AVG_TRAFFIC_DATA;
    avgData: TrafficAvgData;
}

export type UpdateRawTrafficDataAction = UpdateRawTrafficData;
export type UpdateAvgTrafficDataAction = UpdateAvgTrafficData;
export type RootAction = UpdateRawTrafficDataAction | UpdateAvgTrafficDataAction;

export function updateRawTrafficData(data: TrafficData): UpdateRawTrafficData {
    return {
        type: constants.UPDATE_RAW_TRAFFIC_DATA,
        rawData: data
    }
}

export function updateAvgRawTrafficData(data: TrafficAvgData): UpdateAvgTrafficData {
    return {
        type: constants.UPDATE_AVG_TRAFFIC_DATA,
        avgData: data
    }
}
