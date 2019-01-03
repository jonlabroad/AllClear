import * as React from "react";
import TrafficData from "../data/TrafficData";
import Credentials from "../aws/Credentials";
import { LinePlotContainer } from "../containers/LinePlotContainer";

export interface AllClearDashboardProps {
    rawData: TrafficData;
}

export default class AllClearDashboard extends React.Component<AllClearDashboardProps, object> {
  constructor(props: any) {
    super(props);

    new Credentials().init();
  }

  render() {
    return (
      <div>
        <LinePlotContainer
          seriesName='Home'
          rawData={this.props.rawData}
        />
        <LinePlotContainer
          seriesName='Work'
          rawData={this.props.rawData}
        />
        <LinePlotContainer
          seriesName='Work: Burl Exit'
          rawData={this.props.rawData}
        />
      </div>
    );
  }
}