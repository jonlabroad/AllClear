import * as React from "react";
import { DashboardState } from "../types";
import { connect } from "react-redux";
import TrafficData from "../data/TrafficData";
import LinePlot, { LinePlotSeries } from "../components/LinePlot";
import Enumerable from 'linq';
import "../styles/plot.css"
import TrafficAvgData from "../data/TrafficAvgData";
import DateUtil from "../util/DateUtil";

export interface LinePlotContainerProps {
    calendarDate: string,
    plotName: string,
    rawData: TrafficData | undefined,
    avgData: TrafficAvgData | undefined
}

export class LinePlotContainer extends React.Component<LinePlotContainerProps, object>
{
    componentDidMount()
    {
    }

    render()
    {
        var allSeries: LinePlotSeries[] = [];
        var yAxisMin = 1.0;
        var yAxisMax = 4.0;
        var tripName = this.props.plotName;
        if (this.props.rawData)
        {
            var markers: Record<string, string> = {
                MapQuest: "circle",
                MapBox: "triangle"
            };
            var tripData = this.props.rawData.data.get(tripName);
            var i = 0;
            var dataSources = Enumerable.from(tripData ?? []).select(t => t.DataSource).distinct();
            dataSources.forEach(datasource => {
                var series = Enumerable.from(tripData ?? []).where(t => t.DataSource === datasource);
                // No idea why I need to divide by 2 here!!!
                Enumerable.from(series).forEach(e => e.Date.setUTCMinutes(e.Date.getUTCMinutes() - e.Date.getTimezoneOffset()/2));
                var x = Enumerable.from(series).select(e => e.Date).toArray();
                var y = Enumerable.from(series).select(e => e.Factor).toArray();
                allSeries.push({
                    name: datasource,
                    x: x,
                    y: y,
                    marker: markers[datasource]
                });
            });
        }

        if (this.props.avgData)
        {
            var series2 = this.props.avgData.data.get(tripName);
            var x2 = Enumerable.from(series2?.data ?? []).select(e => DateUtil.getMoment(this.props.calendarDate, e.HourMin)).toArray();
            Enumerable.from(x2).forEach(e => e.setUTCMinutes(e.getUTCMinutes() - e.getTimezoneOffset()));
            var y2 = Enumerable.from(series2?.data ?? []).select(e => e.Factor).toArray();
            allSeries.push({
                name: "Average",
                x: x2,
                y: y2,
                marker: ""
            });
        }

        return (
            <div className="plot-container">
                <LinePlot
                    title={tripName}
                    series={allSeries}
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