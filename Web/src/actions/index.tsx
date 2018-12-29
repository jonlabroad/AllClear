import * as constants from '../constants';
import TrafficData from '../data/TrafficData';

export interface ChangeTestText {
    type: constants.CHANGE_TEST_TEXT;
    text: string;
}

export type ChangeTextAction = ChangeTestText;

export function changeTestText(newText: string): ChangeTestText {
    return {
        type: constants.CHANGE_TEST_TEXT,
        text: newText
    }
}

export interface UpdateRawTrafficData {
    type: constants.UPDATE_RAW_TRAFFIC_DATA;
    rawData: TrafficData;
}

export type UpdateRawTrafficDataAction = UpdateRawTrafficData;

export function updateRawTrafficData(data: TrafficData): UpdateRawTrafficData {
    return {
        type: constants.UPDATE_RAW_TRAFFIC_DATA,
        rawData: data
    }
}
