import * as React from "react";
import TrafficData from "../data/TrafficData";
import AppBar from '@material-ui/core/AppBar';
import '../styles/appbar.css'
import '../styles/app.css'
import { blue, teal, green } from "@material-ui/core/colors";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TrafficPlotSet from "./TrafficPlotSet";
import TrafficAvgData from "../data/TrafficAvgData";
import Url from "../util/Url";

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: green
  }
});

export interface AllClearDashboardProps {
  calendarDate: string;
  rawData: TrafficData | undefined;
  avgData: TrafficAvgData | undefined;
}

export default class AllClearDashboard extends React.Component<AllClearDashboardProps, object> {
  constructor(props: any) {
    super(props);

    //new Credentials().init();
  }

  render() {
    return (
      <MuiThemeProvider
        theme={theme}
      >
        <AppBar
          position="relative"
          color="primary"
          className={'appbar'}
        >
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={'appbar-title'}
          >
            Traffic Dashboard
          </Typography>
        </AppBar>
        <TrafficPlotSet
          calendarDate={this.props.calendarDate}
          rawData={this.props.rawData}
          avgData={this.props.avgData}
        />
      </MuiThemeProvider>
    );
  }
}