import * as React from "react";
import { DashboardState } from "../types";
import { connect } from "react-redux";
import TrafficData from "../data/TrafficData";
import LinePlot from "../components/LinePlot";
import Enumerable from 'linq';

export interface LinePlotContainerProps {
    seriesName: string,
    rawData: TrafficData
}

export class LinePlotContainer extends React.Component<LinePlotContainerProps, object>
{
    componentDidMount()
    {
    }

    render()
    {
        if (!this.props.rawData)
        {
            return null;
        }

        var seriesName = this.props.seriesName;
        var series = this.props.rawData.data.get(seriesName);
        var x = Enumerable.from(series).select(e => e.Date).toArray();
        var y = Enumerable.from(series).select(e => e.Factor).toArray();
        var yAxisMin = 0.0;
        var yAxisMax = 4.5;
        return (
            <LinePlot
                title={seriesName}
                x={x}
                y={y}
                xAxisLabel='Time'
                yAxisLabel='Factor'
                yAxisMin={yAxisMin}
                yAxisMax={yAxisMax}
            />
        );
    }
}

export function mapStateToProps(state: DashboardState) {
    return {
      rawData: state.rawData
    }
}

export default connect(mapStateToProps, null)(LinePlotContainer);