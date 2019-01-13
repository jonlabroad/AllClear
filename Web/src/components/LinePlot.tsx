import * as React from "react";
import Highcharts, { SeriesOptionsType } from "highcharts";
import Enumerable from "linq";
const ReactHighcharts = require('react-highcharts');

export interface LinePlotProps {
    title: string,
    x: Date[];
    y: number[];
    x2: Date[];
    y2: number[];
    xAxisLabel: string;
    yAxisLabel: string;
    yAxisMin: number;
    yAxisMax: number;
}

export default class LinePlot extends React.Component<LinePlotProps, object> {
    constructor(props: any) {
        super(props);
    }

    createSeries(name: string, type: any, x: number[], y: number[], showMarker: boolean): SeriesOptionsType
    {
        var newSeries: Highcharts.SeriesLineOptions = {
            name: name,
            type: type,
            data: new Array<Highcharts.SeriesLineOptions>(),
            marker: {
                enabled: showMarker
            }
        };
        for (var i=0; i < x.length; i++)
        {
            newSeries.data.push([x[i], y[i]]);
        }
        return newSeries;
    }

    createConfig(): Highcharts.Options {
        var config: Highcharts.Options = {};
        config.title = {
            text: this.props.title
        };
        config.xAxis = {
            type: 'datetime',
            title: {
                text: this.props.xAxisLabel
            }
        };
        config.yAxis = {
            title: {
                text: this.props.yAxisLabel
            },
            min: this.props.yAxisMin,
            max: this.props.yAxisMax
        };
        config.plotOptions = {
            line: {
                marker: {
                    enabled: true
                }
            }
        }
        config.series = new Array<Highcharts.SeriesOptionsType>();
        config.series.push(this.createSeries(
            "Factor",
            'line',
            Enumerable.from(this.props.x).select(x => x.getTime()).toArray(),
            this.props.y,
            true
        ));
        config.series.push(this.createSeries(
            "Average",
            'line',
            Enumerable.from(this.props.x2).select(x => x.getTime()).toArray(),
            this.props.y2,
            false
        ));

        return config;
    }

    render() {
        return (
            <div>
                <ReactHighcharts
                    config={this.createConfig()}
                />
            </div>
        );
    }
}