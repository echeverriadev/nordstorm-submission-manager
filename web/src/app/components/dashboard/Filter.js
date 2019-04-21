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
    display: 'flex',
    marginLeft: 30,
  },
  selectFilter: {
    width: 150,
    marginRight: '30px'
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  button:{
    borderRadius: 1,
    color: "#FFFFFF",
    backgroundColor:"#00838c",
    marginTop: 15,
    width:150,
  },
  iconButton: {
    padding: 10,
  },
  inputButton: {
    display: 'none',
    color: "#FFF",
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

    onClick = () => {
      this.refs.buttonFile.click();
    }

    onSubmit = (e) => {
      const file = Array.from(e.target.files)[0]

      if (['xls', 'xlsx'].indexOf(file.name.split('.')[file.name.split('.').length-1]) === -1) {
        alert('Invalid format, use xls or xlsx instead');
      }else{
        const formData = new FormData()

        formData.append('file', file)

        fetch(`${process.env.REACT_APP_API_URL}/items/import`, {
          method: 'POST',
          body: formData
        })
        .then(res => res.json())
        .then(res => {
          if(res.code === 200){
            alert('Items imported successfully')
          }else{
            console.error(res)
            alert(res.message || 'oops a problem has occurred')
          }
        })
      }
    }

    render = () => {
        const { cycles, divisions } = this.state
        const { classes, filter, onChangeFilter,
        cannedFilters, onAddCannedFilter, onRemoveCannedFilter } = this.props

      return (
          <Grid className={classes.root} spacing={0}>
              <Grid item >
                <TextField
                  className={classes.selectFilter}
                  id="cycleId"
                  name="cycleId"
                  select
                  label="Cycle / Month"
                  value={filter.cycleId}
                  onChange={onChangeFilter}
                >
                  {cycles.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  className={classes.selectFilter}
                  id="divisionId"
                  name="divisionId"
                  select
                  label="Division"
                  value={filter.divisionId}
                  onChange={onChangeFilter}
                >
                  {divisions.map((option,index) => (
                    <MenuItem key={index} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>
              <input className={classes.inputButton} id="button-file" ref="buttonFile" type="file" onChange={this.onSubmit}/>
                <Button htmlFor="icon-button-file" variant="contained" className={classes.button} onClick={this.onClick}>
                  <Icon className={classes.rightIcon}>save_alt</Icon>
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
          </Grid>
      );
    }

}

Filter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Filter);