import { Grid } from '@material-ui/core';
import { Redirect, Router } from '@reach/router';
import React from 'react';

import Header from './components/header/Header';
import QuoteOverview from './pages/quote-overview/QuoteOverview';
import RatingInformation from './pages/rating-information/RatingInformation';

function App() {
  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <Grid item container>
        <Grid item xs={false} sm={2} />
        <Grid item xs={12} sm={8}>
          <Router>
            <RatingInformation path="rating-information" />
            <QuoteOverview path="quote-overview" />
            <Redirect from="/" to="/rating-information" default noThrow />
          </Router>
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
    </Grid>
  );
}

export default App;
