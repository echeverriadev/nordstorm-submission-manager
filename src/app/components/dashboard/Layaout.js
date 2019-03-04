import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Head from './cells/Head';
import CardCell from './cells/CardCell';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  }
});

const Layaout = (props) => {
  const { classes, onChange, items } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Head/>
        {
          items.map((item, index) => (
            <CardCell key={index} index={index} item={item} onChange={onChange}/>
          ))
        }
      </Grid>
    </div>
  );
}

Layaout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layaout);