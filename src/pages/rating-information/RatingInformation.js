import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography as Text,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { navigate } from '@reach/router';
import axios from 'axios';
import React, { useState } from 'react';

import STATES from '../../constants/states';

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
  textFieldStyles: {
    padding: '24px 0px',
    width: '100%',
  },
  selectStyles: {
    minWidth: 75,
    width: '100%',
  },
}));

const CREATE_QUOTE_ENDPOINT = 'https://fed-challenge-api.sure.now.sh/api/v1/quotes';

const RatingInformation = () => {
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    address: {
      line_1: '',
      line_2: '',
      city: '',
      region: '',
      postal: '',
    },
  });
  const [error, setError] = useState('');
  const classes = useStyles();

  const createQuote = async (data) => {
    try {
      await axios.post(CREATE_QUOTE_ENDPOINT, data)
        .then((response) => {
          navigate('/quote-overview', { state: response.data });
        });
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const addPostalInputMaxLength = (e) => {
    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 5);
  };

  const isButtonDisabled = () => (
    !(
      userInfo.first_name
      && userInfo.last_name
      && userInfo.address.line_1
      && userInfo.address.city
      && userInfo.address.region
      && (userInfo.address.postal.length === 5)
    )
  );

  const renderSelectStateItems = STATES.map((value) => (
    <MenuItem key={value} value={value}>{value}</MenuItem>
  ));

  const renderErrorMessage = () => (
    <Grid item xs={12}>
      <Text
        variant="body1"
        color="secondary"
        className={classes.body1Styles}
      >
        {`Error: ${error}`}
      </Text>
    </Grid>
  );

  return (
    <Grid
      container
      direction="column"
    >
      <Grid item xs={false} sm={2} />
      <Grid item xs={12} sm={8} md={6}>
        <Container className={classes.containerStyles}>
          <Text variant="h2" color="primary">Rating Information</Text>
          <Text
            variant="body1"
            color="textPrimary"
            className={classes.body1Styles}
          >
            In order to create a quote, we need to collect the following information.
          </Text>
        </Container>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                inputProps={{ 'data-testid': 'first-name-textfield' }}
                required
                name="firstName"
                label="First name"
                fullWidth
                value={userInfo.first_name}
                onChange={(e) => setUserInfo({
                  ...userInfo,
                  first_name: e.target.value,
                })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                inputProps={{ 'data-testid': 'last-name-textfield' }}
                required
                name="lastName"
                label="Last name"
                fullWidth
                value={userInfo.last_name}
                onChange={(e) => setUserInfo({
                  ...userInfo,
                  last_name: e.target.value,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputProps={{ 'data-testid': 'address-1-textfield' }}
                required
                name="address1"
                label="Address line 1"
                fullWidth
                value={userInfo.address.line_1}
                onChange={(e) => setUserInfo({
                  ...userInfo,
                  address: {
                    ...userInfo.address,
                    line_1: e.target.value,
                  },
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="address2"
                label="Address line 2"
                fullWidth
                value={userInfo.address.line_2}
                onChange={(e) => setUserInfo({
                  ...userInfo,
                  address: {
                    ...userInfo.address,
                    line_2: e.target.value,
                  },
                })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                inputProps={{ 'data-testid': 'city-textfield' }}
                required
                name="city"
                label="City"
                fullWidth
                value={userInfo.address.city}
                onChange={(e) => setUserInfo({
                  ...userInfo,
                  address: {
                    ...userInfo.address,
                    city: e.target.value,
                  },
                })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl required className={classes.selectStyles}>
                <InputLabel id="state-select-label">State</InputLabel>
                <Select
                  inputProps={{
                    'data-testid': 'state-select-label',
                  }}
                  labelId="state-select-label"
                  value={userInfo.address.region}
                  onChange={(e) => setUserInfo({
                    ...userInfo,
                    address: {
                      ...userInfo.address,
                      region: e.target.value,
                    },
                  })}
                >
                  {renderSelectStateItems}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                inputProps={{ 'data-testid': 'zip-textfield' }}
                required
                type="number"
                name="zip"
                label="Zip"
                fullWidth
                onInput={addPostalInputMaxLength}
                value={userInfo.address.postal}
                onChange={(e) => setUserInfo({
                  ...userInfo,
                  address: {
                    ...userInfo.address,
                    postal: e.target.value,
                  },
                })}
              />
            </Grid>
          </Grid>
          {error && renderErrorMessage()}
          <Grid item xs={12} className={classes.buttonContainerStyles}>
            <Button
              disabled={isButtonDisabled()}
              variant="contained"
              color="primary"
              onClick={() => createQuote(userInfo)}
            >
              Continue
            </Button>
          </Grid>
        </Container>
      </Grid>
      <Grid item xs={false} sm={2} />
    </Grid>
  );
};

export default RatingInformation;
