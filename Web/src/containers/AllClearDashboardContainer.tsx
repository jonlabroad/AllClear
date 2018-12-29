import * as React from "react";
import AllClearDashboard from "../components/AllClearDashboard";
import { DashboardState } from "../types";
import { connect } from "react-redux";
import TrafficData from "../data/TrafficData";
import { Dispatch } from "redux";
import { UPDATE_RAW_TRAFFIC_DATA } from "../constants";
import TrafficDBReader from "../client/TrafficDBReader";
import { updateRawTrafficData, UpdateRawTrafficDataAction } from "../actions";

export interface AllClearDashboardContainerProps {
    rawData: TrafficData,
    updateTrafficData: any
}

export class AllClearDashboardContainer extends React.Component<AllClearDashboardContainerProps, object>
{
    componentDidMount()
    {
        var client = new TrafficDBReader();
        client.readToday().then((data: TrafficData) => {
            this.props.updateTrafficData(data);
        });
    }

    render()
    {
        return (
            <AllClearDashboard
                rawData={this.props.rawData}
            />
        );
    }
}

export function mapStateToProps(state: DashboardState) {
    return {
      testText: state.test,
      rawData: state.rawData
    }
}

const mapDispatchToProps = (dispatch: Dispatch<UpdateRawTrafficDataAction>) => ({
     updateTrafficData: (data: TrafficData) => dispatch(updateRawTrafficData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllClearDashboardContainer);