import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography as Text,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Redirect } from '@reach/router';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import formatNumberToMoneyWithCommas from '../../utils/format';

const useStyles = makeStyles(() => ({
  body1Styles: {
    marginTop: 8,
  },
  buttonContainerStyles: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 40,
  },
  containerStyles: {
    margin: '40px 0px',
  },
  formContainerStyles: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginBottom: 40,
  },
  formSection: {
    padding: '24px 0px',
  },
  selectStyles: {
    marginTop: '16px',
  },
  errorStyles: {
    marginTop: 24,
  },
}));

const QuoteOverviewComponent = ({ location: { state: { quote } } }) => {
  const {
    quoteId,
    rating_address: ratingAddress,
    policy_holder: policyHolder,
    variable_options: {
      deductible: {
        title: deductibleTitle,
        description: deductibleDescription,
        values: deductibleValues,
      },
      asteroid_collision: {
        title: collisionTitle,
        description: collisionDescription,
        values: collisionValues,
      },
    },
    variable_selections: {
      deductible: defaultDeductible,
      asteroid_collision: defaultCollision,
    },
    premium: defaultPremium,
  } = quote;

  const [selectedDeductible, setSelectedDeductible] = useState(defaultDeductible);
  const [selectedCollision, setSelectedCollision] = useState(defaultCollision);
  const [premium, setPremium] = useState(defaultPremium);
  const [userPolicy, setUserPolicy] = useState({}); // eslint-disable-line
  const [error, setError] = useState('');
  const classes = useStyles();

  const UPDATE_QUOTE_ENDPOINT = `https://fed-challenge-api.sure.now.sh/api/v1/quotes/${quoteId}`;

  const updateQuote = async () => {
    const dataBody = {
      quote: {
        quoteId,
        rating_address: ratingAddress,
        policy_holder: policyHolder,
        variable_selections: {
          deductible: selectedDeductible,
          asteroid_collision: selectedCollision,
        },
      },
    };

    try {
      await axios.put(UPDATE_QUOTE_ENDPOINT, dataBody)
        .then((response) => {
          const { data } = response;
          setUserPolicy(data);
          setPremium(data.quote.premium);
        });
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  useEffect(() => {
    updateQuote();
  }, [selectedDeductible, selectedCollision]);

  const renderSelectMenuItems = (arr) => (arr.map((value) => (
    <MenuItem key={value} value={value}>{value}</MenuItem>
  )));

  const renderErrorMessage = () => (
    <Text
      variant="body1"
      color="secondary"
      className={classes.errorStyles}
    >
      {`Error: ${error}`}
    </Text>
  );

  return (
    <Grid container direction="column">
      <Grid item xs={false} sm={2} />
      <Grid item xs={12}>
        <Container className={classes.containerStyles}>
          <Text variant="h2" color="primary">Quote Overview</Text>
          <Text
            variant="body1"
            color="textPrimary"
            className={classes.body1Styles}
          >
            Here are the available policies and coverage limits.
          </Text>
        </Container>
        <Container className={classes.formContainerStyles}>
          <div className={classes.formSection}>
            <Text variant="subtitle1" color="primary">{deductibleTitle}</Text>
            <Text variant="body1" color="textPrimary">{deductibleDescription}</Text>
            <FormControl className={classes.selectStyles}>
              <InputLabel id="deductible-select-label">Deductibles</InputLabel>
              <Select
                inputProps={{
                  'data-testid': 'deductible-select-label',
                }}
                labelId="deductible-select-label"
                value={selectedDeductible}
                onChange={(e) => setSelectedDeductible(e.target.value)}
              >
                {renderSelectMenuItems(deductibleValues)}
              </Select>
            </FormControl>
          </div>
          <div className={classes.formSection}>
            <Text variant="subtitle1" color="primary">{collisionTitle}</Text>
            <Text variant="body1" color="textPrimary">{collisionDescription}</Text>
            <FormControl className={classes.selectStyles}>
              <InputLabel id="collision-select-label">Collisions</InputLabel>
              <Select
                inputProps={{
                  'data-testid': 'collision-select-label',
                }}
                labelId="collision-select-label"
                value={selectedCollision}
                onChange={(e) => setSelectedCollision(e.target.value)}
              >
                {renderSelectMenuItems(collisionValues)}
              </Select>
            </FormControl>
          </div>
          <div className={classes.formSection}>
            <Text
              variant="body1"
              color="primary"
              className={classes.body1Styles}
            >
              Premium Amount
            </Text>
            <Text
              variant="body1"
              color="textPrimary"
            >
              {` $${formatNumberToMoneyWithCommas(premium)}`}
            </Text>
            {error && renderErrorMessage()}
          </div>
        </Container>
      </Grid>
      <Grid item xs={false} sm={2} />
    </Grid>
  );
};

const QuoteOverview = ({ location }) => {
  if (
    (location.state === null)
    || (typeof (location.state.quote) === 'undefined')
  ) {
    return (
      <Redirect from="/quote-overview" to="/rating-information" />
    );
  }

  return (<QuoteOverviewComponent location={location} />);
};

QuoteOverviewComponent.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      quote: PropTypes.shape({
        quoteId: PropTypes.string,
        rating_address: PropTypes.shape({
          line_1: PropTypes.string,
          line_2: PropTypes.string,
          city: PropTypes.string,
          region: PropTypes.string,
          postal: PropTypes.string,
        }),
        policy_holder: PropTypes.shape({
          first_name: PropTypes.string,
          last_name: PropTypes.string,
        }),
        variable_options: PropTypes.shape({
          deductible: PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
            values: PropTypes.arrayOf(PropTypes.number),
          }),
          asteroid_collision: PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
            values: PropTypes.arrayOf(PropTypes.number),
          }),
        }),
        variable_selections: PropTypes.shape({
          deductible: PropTypes.number,
          asteroid_collision: PropTypes.number,
        }),
        premium: PropTypes.number,
      }),
    }),
  }).isRequired,
};

QuoteOverview.propTypes = QuoteOverviewComponent.propTypes;

export default QuoteOverview;
