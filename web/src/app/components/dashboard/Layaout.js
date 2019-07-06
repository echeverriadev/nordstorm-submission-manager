import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import {Grid, Chip} from '@material-ui/core';

import Head from './cells/Head';
import CardCell from './cells/CardCell';
import AddCell from './cells/AddCell';
import Filter from './Filter';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme();

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
    margin: 10,
  },
   chip: {
    marginTop: 20,
    margin: theme.spacing(0.5),
    backgroundColor: '#4daff2'
  },
  head:{
    position: 'sticky',
    top:'0px',
    zIndex: '100',
    backgroundColor: 'white',
    width: '100%',
    marginTop:'12px'
  },

});

const Layaout = (props) => {
  const { isChangingFilter, classes, onChange, items, addItem, onAddChange, onSubmit, onChangeFilter,
    total, offset, filter, onChangePagination, order, onChangeOrder, onRefreshItems,
    cannedFilters, onAddCannedFilter, onRemoveCannedFilter, cycles, divisions, onDeleteItem, onDuplicateItem } = props;

  return (
    <div className={classes.root}>
      <div className={classes.head}>
      
        <Filter
          cycles={cycles}
          divisions={divisions}
          filter={filter}
          cannedFilters={cannedFilters}
          onChangeFilter={onChangeFilter}
          onAddCannedFilter={onAddCannedFilter}
          onRemoveCannedFilter={onRemoveCannedFilter}
          onRefreshItems={onRefreshItems}
        />
        <Grid container spacing={0}>
          {cannedFilters.map((filter, i) =>
            <Chip
              key={i}
              label={filter.label}
              color="primary"
              onDelete={() => onRemoveCannedFilter(i)}
              className={classes.chip}
            />
          )}
          <Head
            order={order}
            onChangeOrder={onChangeOrder}
          />
        </Grid>
      </div>
      <div className={classes.body}>
        <Grid>
              {
                items.map((item, index) => (
                  <CardCell key={index} index={index} item={item} isChangingFilter={isChangingFilter} onChange={onChange} cycles={cycles} onDeleteItem={onDeleteItem} onDuplicateItem={onDuplicateItem} />
                ))
              }
              {
                (filter.cycleId === "" || filter.divisionId === "" || filter.divisionId === "ALL") ?
                null:
                <AddCell item={addItem} onChange={onAddChange} onSubmit={onSubmit} cycles={cycles}/>
              }
            {total > 0 && <Pagination
              limit={10}
              offset={offset}
              total={total}
              onClick={(e, offset) => onChangePagination(offset)}
              size="large"
            />}
            {total > 0 && <Typography>{total} items found</Typography>}
        </Grid>
         <MuiThemeProvider theme={theme}>
          <CssBaseline />
        </MuiThemeProvider>
      </div>
    </div>
  );
}


Layaout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layaout);