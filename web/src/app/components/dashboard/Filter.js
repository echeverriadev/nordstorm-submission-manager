import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, TextField, MenuItem} from '@material-ui/core';
import {getCyclesApi, getDivisionsApi} from '../../../api';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Search from './Search'

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '50%',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});

class Filter extends Component {

    state = {
        cycles: [],
        divisions: []
    }

    componentWillMount = () => {
        this.fetchCyclesApi()
        this.fetchDivisionsApi()
    }

    fetchCyclesApi = () => {
      getCyclesApi().then(response => {
        if (response.status === 200)
          this.setState({cycles: response.data})
      }, err => {
        console.log(err)
      })
    }

    fetchDivisionsApi = () => {
      getDivisionsApi().then(response => {
        if (response.status === 200)
          this.setState({divisions: response.data})
      }, err => {
        console.log(err)
      })
    }


    render = () => {
        const { cycles, divisions } = this.state
        const { classes, filter, onChangeFilter,
        cannedFilters, onAddCannedFilter, onRemoveCannedFilter } = this.props

      return (
          <Grid className={classes.root} container spacing={32}>
            <Grid item md={1}/>
            <Grid item md={2}>
              <TextField
                id="cycleId"
                name="cycleId"
                select
                label="Cycle / Month"
                value={filter.cycleId}
                onChange={onChangeFilter}
                fullWidth
              >
                {cycles.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={2}>
              <TextField
                id="divisionId"
                name="divisionId"
                select
                label="Division"
                value={filter.divisionId}
                fullWidth
                onChange={onChangeFilter}
              >
                {divisions.map((option,index) => (
                  <MenuItem key={index} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={2}>
              <Button variant="contained" color="primary" className={classes.button}>
                <Icon className={classes.rightIcon}>send</Icon>
                import
              </Button>
            </Grid>
            <Grid item md>
              <Search
                cannedFilters={cannedFilters}
                onAddCannedFilter={onAddCannedFilter}
                onRemoveCannedFilter={onRemoveCannedFilter}
              />
            </Grid>
            <Grid item md={1}/>
          </Grid>
      );
    }

}

Filter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Filter);