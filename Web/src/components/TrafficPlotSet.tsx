import * as React from "react";
import TrafficData from "../data/TrafficData";
import { Grid } from "@material-ui/core";
import { LinePlotContainer } from "../containers/LinePlotContainer";
import TrafficAvgData from "../data/TrafficAvgData";

export interface TrafficPlotSetProps {
    calendarDate: string;
    rawData: TrafficData;
    avgData: TrafficAvgData;
}

export default class TrafficPlotSet extends React.Component<TrafficPlotSetProps, object> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Grid container spacing={24} className="main-element">
                <Grid item xs={1}/>
                <Grid item xs={10}>
                <LinePlotContainer
                    calendarDate={this.props.calendarDate}
                    plotName='Home'
                    rawData={this.props.rawData}
                    avgData={this.props.avgData}
                />
                </Grid>
                <Grid item xs={1}/>
                <Grid item xs={1}/>
                <Grid item xs={10}>
                <LinePlotContainer
                    calendarDate={this.props.calendarDate}
                    plotName='Work'
                    rawData={this.props.rawData}
                    avgData={this.props.avgData}
                />
                </Grid>
                <Grid item xs={1}/>
                <Grid item xs={1}/>
                <Grid item xs={10}>
                <LinePlotContainer
                    calendarDate={this.props.calendarDate}
                    plotName='Work: Burl Exit'
                    rawData={this.props.rawData}
                    avgData={this.props.avgData}
                />
            </Grid>
            <Grid item xs={1}/>
          </Grid>
        );
    }
}