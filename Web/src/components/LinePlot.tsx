import * as React from "react";
import Highcharts from "highcharts";
const ReactHighcharts = require('react-highcharts');

export interface LinePlotProps {
    title: string,
    x: Date[];
    y: number[];
    xAxisLabel: string;
    yAxisLabel: string;
    yAxisMin: number;
    yAxisMax: number;
}

export default class LinePlot extends React.Component<LinePlotProps, object> {
    constructor(props: any) {
        super(props);
    }

    createDatapoint(x: number, y: number): [number, number] {
        return [x, y];
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
        var newSeries: Highcharts.SeriesLineOptions = {
            name: "Factor",
            type: 'line',
            data: new Array<Highcharts.SeriesLineOptions>()
        };
        for (var i=0; i<this.props.x.length; i++)
        {
            newSeries.data.push([this.props.x[i].getTime(), this.props.y[i]]);
        }
        config.series.push(newSeries);
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