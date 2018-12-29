import * as React from "react";
import TrafficData from "../data/TrafficData";
import Credentials from "../aws/Credentials";

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
        {this.props.rawData ? Array.from(this.props.rawData.data.keys()) : "NO DATA"}
      </div>
    );
  }
}