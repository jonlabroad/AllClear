import * as React from "react";
import Highcharts, { SeriesOptionsType } from "highcharts";
import Enumerable from "linq";
const ReactHighcharts = require('react-highcharts');

export interface LinePlotSeries {
    name: string;
    x: Date[];
    y: number[];
    marker: string;
}

export interface LinePlotProps {
    series: LinePlotSeries[];
    title: string,
    xAxisLabel: string;
    yAxisLabel: string;
    yAxisMin: number;
    yAxisMax: number;
}

export default class LinePlot extends React.Component<LinePlotProps, object> {
    constructor(props: any) {
        super(props);
    }

    createSeries(name: string, type: any, x: number[], y: number[], showMarker: boolean, marker?: string): SeriesOptionsType
    {
        var newSeries: Highcharts.SeriesLineOptions = {
            name: name,
            type: type,
            data: [],
            marker: {
                enabled: showMarker,
                radius: 5,
                symbol: marker || "circle"
            }
        };
        for (var i=0; i < x.length; i++)
        {
            newSeries?.data?.push([x[i], y[i]]);
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
        Enumerable.from(this.props.series).forEach(s => {
            config.series?.push(this.createSeries(
                s.name,
                'line',
                Enumerable.from(s.x).select(x => x.getTime()).toArray(),
                s.y,
                s.marker ? true : false,
                s.marker
            ));
        });

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