import { DashboardState } from '../types/index';
import { CHANGE_TEST_TEXT, UPDATE_RAW_TRAFFIC_DATA } from '../constants/index';
import { Reducer } from 'redux';

const initialState: DashboardState = {
    test: "DEFAULT VALUE",
    rawData: undefined
};

export const changeText: Reducer<DashboardState> = (state = initialState, action): DashboardState => {
  switch (action.type) {
    case CHANGE_TEST_TEXT:
      return { ...state, test: action.text };
    case UPDATE_RAW_TRAFFIC_DATA:
      return { ...state, rawData: action.rawData };
  }
  return state;
}