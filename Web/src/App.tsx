import React from 'react';
import logo from './logo.svg';
import './App.css';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import AllClearDashboardContainer from './containers/AllClearDashboardContainer';

Amplify.configure(awsconfig);

function App() {
  return (
    <AllClearDashboardContainer />
  );
}

export default withAuthenticator(App, true);
