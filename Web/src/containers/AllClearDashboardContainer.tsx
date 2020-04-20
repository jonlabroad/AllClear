import * as React from "react";
import AllClearDashboard from "../components/AllClearDashboard";
import { DashboardState } from "../types";
import { connect } from "react-redux";
import TrafficData from "../data/TrafficData";
import TrafficAvgData from "../data/TrafficAvgData";
import { Dispatch } from "redux";
import TrafficDBReader from "../client/TrafficDBReader";
import { RootAction, updateRawTrafficData, UpdateRawTrafficDataAction, updateAvgRawTrafficData } from "../actions";
import Url from "../util/Url";
import DateUtil from "../util/DateUtil";
import Credentials from "../aws/Credentials";

export interface AllClearDashboardContainerProps {
    rawData: TrafficData | undefined,
    avgData: TrafficAvgData | undefined,
    updateTrafficData: any,
    updateAvgData: any
}

export class AllClearDashboardContainer extends React.Component<AllClearDashboardContainerProps, object>
{
    componentDidMount()
    {
        new Credentials().init().then(() => {
            var client = new TrafficDBReader();
            var dateParam = Url.getParameterByName('date') || DateUtil.getTodayCalendarDate();
            client.readDate(dateParam).then((data: TrafficData) => {
                this.props.updateTrafficData(data);
            });

            client.readAvg(dateParam).then((data: TrafficAvgData) => {
                this.props.updateAvgData(data);
            });
        })
    }

    render()
    {
        var dateParam = Url.getParameterByName('date') || DateUtil.getTodayCalendarDate();
        return (
            <AllClearDashboard
                calendarDate={dateParam}
                rawData={this.props.rawData}
                avgData={this.props.avgData}
            />
        );
    }
}

export function mapStateToProps(state: DashboardState) {
    return {
      rawData: state.rawData,
      avgData: state.avgData
    }
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
     updateTrafficData: (data: TrafficData) => dispatch(updateRawTrafficData(data)),
     updateAvgData: (data: TrafficAvgData) => dispatch(updateAvgRawTrafficData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllClearDashboardContainer);