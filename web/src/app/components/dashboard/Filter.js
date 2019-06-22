import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, MenuItem} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Search from './Search'
import { uploadExcelApi } from '../../../api';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import '../Utils/dashboardCustom.css' 

const styles = theme => ({
  root: {
    display: 'flex',
    marginLeft: 30,
  },
  selectFilter: {
    marginTop: 10,
    width: 150,
    marginRight: 30,
    fontSize: '13px',
    fontWeight: 'bold',
    color: 'black',
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
  fontBolt:{
    fontWeight: 'bold',
    color: 'black',
    fontSize: '13px'
    
  }
  
});

class Filter extends Component {
  
    handleConfirm = (e) => {
      const file = Array.from(e.target.files)[0]
      if(file){ //If there is a file selected}
      return(
        <div>
        {
          confirmAlert({
            title: 'Import items',
            message: 'Do you really want to continue with the Import?',
            buttons: [
              {
                label: 'Ok',
                onClick: () => this.onSubmit(file)
              },
              {
                label: 'Cancel',
              }
            ]
          })
        }
        </div>
      );
        this.refs.buttonFile.value = '' //Without this the same file couldn't be uploaded again
      }
    }

    onClick = () => {
      this.refs.buttonFile.click()
    }
    /*
    setItemsAsCreatedInLog = (items) => {
      (items && items.length > 0)? 
        items.map((item))
      :
      ""
    }
    */
    onSubmit = (file) => {
      if (['xls', 'xlsx'].indexOf(file.name.split('.')[file.name.split('.').length-1]) === -1) {
        alert('Invalid format, use xls or xlsx instead');
      }else{
        const { filter: {divisionId, cycleId} } = this.props
        const formData = new FormData()

        formData.append('file', file)
        formData.append('_fk_division', divisionId)
        formData.append('_fk_cycle', cycleId)
        uploadExcelApi(formData).then(res => {
          if(res.code === 200){
            //this.setItemsAsCreatedInLog(res.data)
            this.props.onRefreshItems() //Refresh list for getting all new items
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
      return (
          <Grid className={classes.root}>
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
                    <InputLabel
                            FormLabelClasses={{
                            root: classes.fontBolt,
                            }}
                         >
                      Cycle / Month
                      </InputLabel>
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
                  <InputLabel
                    FormLabelClasses={{
                      root: classes.fontBolt,
                      }}
                      >
                      Division
                      </InputLabel>
                  </MenuItem>
                  {divisions.map((option,index) => (
                    <MenuItem key={index} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item>
                {filter.cycleId !== "" && filter.divisionId !== "" && filter.divisionId !== "ALL" && 
                <Button color="primary" variant="contained" className={classes.button} onClick={this.onClick}>
                  <Icon className={classes.rightIcon}>save_alt</Icon>
                  import
                </Button>}
                <input className={classes.inputButton} id="button-file" ref="buttonFile" type="file" onChange={this.handleConfirm}/>
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