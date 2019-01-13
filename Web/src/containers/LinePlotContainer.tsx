import * as React from "react";
import { DashboardState } from "../types";
import { connect } from "react-redux";
import TrafficData from "../data/TrafficData";
import LinePlot from "../components/LinePlot";
import Enumerable from 'linq';
import "../styles/plot.css"
import TrafficAvgData from "../data/TrafficAvgData";
import DateUtil from "../util/DateUtil";

export interface LinePlotContainerProps {
    calendarDate: string,
    plotName: string,
    rawData: TrafficData,
    avgData: TrafficAvgData
}

export class LinePlotContainer extends React.Component<LinePlotContainerProps, object>
{
    componentDidMount()
    {
    }

    render()
    {
        var x: Date[] = [];
        var y: number[] = [];
        var seriesName = this.props.plotName;
        if (this.props.rawData)
        {
            var series = this.props.rawData.data.get(seriesName);
            // No idea why I need to divide by 2 here!!!
            Enumerable.from(series).forEach(e => e.Date.setUTCMinutes(e.Date.getUTCMinutes() - e.Date.getTimezoneOffset()/2));
            var x = Enumerable.from(series).select(e => e.Date).toArray();
            var y = Enumerable.from(series).select(e => e.Factor).toArray();
            var yAxisMin = 0.0;
            var yAxisMax = 4.0;
        }

        var x2: Date[] = [];
        var y2: number[] = [];
        if (this.props.avgData)
        {
            var series2 = this.props.avgData.data.get(seriesName);
            x2 = Enumerable.from(series2.data).select(e => DateUtil.getMoment(this.props.calendarDate, e.HourMin)).toArray();
            Enumerable.from(x2).forEach(e => e.setUTCMinutes(e.getUTCMinutes() - e.getTimezoneOffset()));
            y2 = Enumerable.from(series2.data).select(e => e.Factor).toArray();
        }

        return (
            <div className="plot-container">
                <LinePlot
                    title={seriesName}
                    x={x}
                    y={y}
                    x2={x2}
                    y2={y2}
                    xAxisLabel='Time'
                    yAxisLabel='Factor'
                    yAxisMin={yAxisMin}
                    yAxisMax={yAxisMax}
                />
            </div>
        );
    }
}

export function mapStateToProps(state: DashboardState) {
    return {
      rawData: state.rawData
    }
}

export default connect(mapStateToProps, null)(LinePlotContainer);