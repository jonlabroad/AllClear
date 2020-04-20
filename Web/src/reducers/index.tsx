import { DashboardState } from '../types/index';
import { UPDATE_RAW_TRAFFIC_DATA, UPDATE_AVG_TRAFFIC_DATA } from '../constants/index';
import { Reducer } from 'redux';

const initialState: DashboardState = {
    rawData: undefined,
    avgData: undefined
};

export const updateData: Reducer<DashboardState> = (state = initialState, action): DashboardState => {
  switch (action.type) {
    case UPDATE_RAW_TRAFFIC_DATA:
      return { ...state, rawData: action.rawData };
    case UPDATE_AVG_TRAFFIC_DATA:
      return { ...state, avgData: action.avgData };
  }
  return state;
}