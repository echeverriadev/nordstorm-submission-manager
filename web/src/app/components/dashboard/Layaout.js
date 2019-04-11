import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';

import Head from './cells/Head';
import CardCell from './cells/CardCell';
import Filter from './Filter';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";

const theme = createMuiTheme();

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  }
});

const Layaout = (props) => {
  const { classes, onChange, items, onChangeFilter,
    total, offset, filter, onChangePagination } = props;

  return (
    <div className={classes.root}>
      <Filter
        filter={filter}
        onChangeFilter={onChangeFilter}
      />
      <Grid container spacing={0}>
        <Head/>
        {
          items.map((item, index) => (
            <CardCell key={index} index={index} item={item} onChange={onChange}/>
          ))
        }
      </Grid>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Pagination
          limit={10}
          offset={offset}
          total={total}
          onClick={(e, offset) => onChangePagination(offset)}
          size="large"
        />
    </MuiThemeProvider>
    </div>
  );
}
  

Layaout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layaout);