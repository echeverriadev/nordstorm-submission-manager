import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, TextField, MenuItem} from '@material-ui/core';
import {getCyclesApi, getDivisionsApi} from '../../../api';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  }
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
        const { classes, filter, onChangeFilter } = this.props

      return (
          <Grid container spacing={32}>
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
                margin="normal"
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
                margin="normal"
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
          </Grid>
      );
    }

}

Filter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Filter);