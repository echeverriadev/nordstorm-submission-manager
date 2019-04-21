import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, MenuItem, IconButton, Paper, InputBase, Menu, Checkbox, ListItemText} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {cannedFiltersAll} from '../../../constant'

const styles = theme => ({
  paper: {
    padding: '2px 4px',
    marginTop: 13,
    display: 'flex',
    alignItems: 'center',
    height: '30px',
    width: '30%',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});

class Search extends Component {

    state = {
      anchorEl: null,
    }

    handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
      this.setState({ anchorEl: null });
    };

    handleSelectFilter = (value, selected) => (event) => {
      const { onRemoveCannedFilter, onAddCannedFilter, cannedFilters } = this.props
      if(selected){ //It was selected, so take off
        const index = cannedFilters.findIndex(filter => filter.id === value.id)
        onRemoveCannedFilter(index)
      }else{ //It wasn't selected, so add
        onAddCannedFilter(value)
      }
    }



    render = () => {
        const { classes, cannedFilters } = this.props
        const { anchorEl } = this.state
        const open = Boolean(anchorEl);

      return (
        <Grid container justify="flex-end">
          <Paper elevation={1} className={classes.paper}>
            <IconButton
              className={classes.iconButton}
              aria-label="Menu"
              onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>
            <InputBase className={classes.input} placeholder="Search" />
            <IconButton className={classes.iconButton} aria-label="Search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={this.handleClose}
            /*PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: 200,
              },
            }}*/
          >
            <MenuItem disabled>
              <em>Canned Filters</em>
            </MenuItem>
            {cannedFiltersAll.map(option =>{
              const selected = cannedFilters.findIndex(filter => filter.id === option.id) > -1
              return(
                  <MenuItem key={option.id} selected={selected} onClick={this.handleSelectFilter(option, selected)}>
                    <Checkbox checked={selected} />
                    <ListItemText primary={option.label} />
                  </MenuItem>
                )
              })
            }
          </Menu>
        </Grid>
      );
    }

}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);