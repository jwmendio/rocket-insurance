import { AppBar, Toolbar, Typography as Text } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
  textStyles: {
    flex: 1,
  },
  iconContainerStyles: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 100,
    display: 'flex',
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
}));

const RatingInformation = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Text className={classes.textStyles}>Spaceway Insurance</Text>
        <div className={classes.iconContainerStyles}>
          <span role="img" aria-label="rocket">🚀</span>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default RatingInformation;
