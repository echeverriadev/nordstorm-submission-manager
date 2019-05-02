import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, TextField, MenuItem} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Search from './Search'

const styles = theme => ({
  root: {
    display: 'flex',
    marginLeft: 30,
  },
  selectFilter: {
    marginTop: 10,
    width: 150,
    marginRight: 30
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  button:{
    backgroundColor:"#00838c",
    '&:hover': {
      backgroundColor: "#01777F",
    },
    borderRadius: 1,
    marginTop: 10,
    width:150,
  },
  iconButton: {
    padding: 10,
  },
  inputButton: {
    display: 'none'
  },
});

class Filter extends Component {

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
        const { classes, cycles, divisions, filter, onChangeFilter,
        cannedFilters, onAddCannedFilter, onRemoveCannedFilter } = this.props

        console.log(filter)
      return (
          <Grid className={classes.root} spacing={0}>
              <Grid item >
                <Select
                  className={classes.selectFilter}
                  id="cycleId"
                  name="cycleId"
                  value={filter.cycleId}
                  onChange={onChangeFilter}
                  displayEmpty={true}
                >
                  <MenuItem value="" disabled>
                      Cycle / Month
                  </MenuItem>
                  {cycles.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item>
                <Select
                  className={classes.selectFilter}
                  id="divisionId"
                  name="divisionId"
                  value={filter.divisionId}
                  onChange={onChangeFilter}
                  displayEmpty={true}
                >
                  <MenuItem value="" disabled>
                      Division
                  </MenuItem>
                  {divisions.map((option,index) => (
                    <MenuItem key={index} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item>
                <Button color="primary" variant="contained" className={classes.button} onClick={this.onClick}>
                  <Icon className={classes.rightIcon}>save_alt</Icon>
                  import
                </Button>
                <input className={classes.inputButton} id="button-file" ref="buttonFile" type="file" onChange={this.onSubmit}/>
            </Grid>
            <Grid item md>
              <Search
                cannedFilters={cannedFilters}
                onAddCannedFilter={onAddCannedFilter}
                onRemoveCannedFilter={onRemoveCannedFilter}
                onChangeFilter={onChangeFilter}
                search={filter.search}
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