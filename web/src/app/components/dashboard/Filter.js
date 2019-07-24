import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, MenuItem } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Search from "./Search";
import { uploadExcelApi } from "../../../api";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import "../Utils/dashboardCustom.css";
import {ExcelRenderer} from 'react-excel-renderer';
import './confirmAlert.css'

const styles = theme => ({
  root: {
    display: "flex",
    marginLeft: 30
  },
  selectFilter: {
    marginTop: 10,
    width: 150,
    marginRight: 30,
    fontSize: "13px",
    fontWeight: "bold",
    color: "black"
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  button: {
    backgroundColor: "#00838c",
    "&:hover": {
      backgroundColor: "#01777F"
    },
    borderRadius: 1,
    marginTop: 10,
    width: 150
  },
  iconButton: {
    padding: 10
  },
  inputButton: {
    display: "none"
  },
  fontBolt: {
    fontWeight: "bold",
    color: "black",
    fontSize: "13px"
  }
});

class Filter extends Component {

  constructor(props){
    super(props);
    this.state = {
      cols: [],
      rows: []
    }
  }
  td(rows, index){
    var elements = [];
    for(var i=1; i<=rows.length-1; i++){
      elements.push(<td key={i}>{rows[i][index]}</td>)
    }
    return elements
  }

  closeModal(){

  }

  handleConfirm = e => {
    const file = Array.from(e.target.files)[0];
    if (file) {
      //If there is a file selected}
      this.refs.buttonFile.value = "";
      ExcelRenderer(file, (err, resp) => {
        if(err){
          console.log(err);            
        }
        else{
          const cols_name = resp.rows[0]
          const rows_value = resp.rows.filter(index => index != 0)
          return (
            <div>
              {confirmAlert({
                customUI: () => { return(
                  <div style={{ maxHeight: "420px", backgroundColor: "#ededed", paddingBottom: "59px", paddingRight: "15px", borderRadius: "15px", maxWidth: "1120px"}}>
                  <div style={{paddingTop: "34px"}}>
                    <label style= {{marginLeft: "50px", fontWeight: "bold", fontSize: "x-large", color: "#888484"}}> Import items </label>
                  </div> 
                    <div>
                      <div className="custom-rows">
                        <label> Showing the first {rows_value.length - 1} rows from file </label>
                      </div>
                      <div className="table-custom">
                        <table style={{whiteSpace: "nowrap"}}> 
                          <tbody>
                              {
                                (cols_name && cols_name.length > 0)?
                                  cols_name.map((column_name, index) => (
                                    <tr>
                                      <th align="left" style={{position: "sticky", left: "0", backgroundColor: "#c1c1c1"}}>{column_name}</th>
                                      {
                                        this.td(rows_value, index).map((element) => (
                                          element
                                        ))
                                      }
                                    </tr>
                                  ))
                                :
                                  <tr> </tr>
                              }
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <label style={{float: "right", marginTop: "10px", fontWeight: "bold", marginTop:"14px", marginRight: "34px"}}>Complete Import?</label>
                    <div style={{marginTop: "46px", marginLeft: "999px"}}>
                      <button style={{borderRadius: "15px", backgroundColor: "black", color: "white", paddingLeft: "21px", paddingRight: "20px"}} onClick={() => this.onSubmit(file)}> YES </button>
                    </div>
                    <div style={{marginTop: "-21px", marginLeft: "910px"}}>
                      <button style={{borderRadius: "15px", backgroundColor: "black", color: "white", paddingLeft: "24px", paddingRight: "23px"}} onClick={() => this.closeModal()}> NO </button>
                    </div>
                  </div>
                )}
              })}
            </div>
          );
        }
      });                 
    }
  };


  onClick = () => {
    this.refs.buttonFile.click();
  };
  /*
    setItemsAsCreatedInLog = (items) => {
      (items && items.length > 0)? 
        items.map((item))
      :
      ""
    }
    */
  onSubmit = file => {
    if (
      ["xls", "xlsx"].indexOf(
        file.name.split(".")[file.name.split(".").length - 1]
      ) === -1
    ) {
      alert("Invalid format, use xls or xlsx instead");
    } else {
      const {
        filter: { divisionId, cycleId }
      } = this.props;
      const formData = new FormData();

      formData.append("file", file);
      formData.append("_fk_division", divisionId);
      formData.append("_fk_cycle", cycleId);
      uploadExcelApi(formData).then(res => {
        if (res.code === 200) {
          //this.setItemsAsCreatedInLog(res.data)
          this.props.onRefreshItems(); //Refresh list for getting all new items
          alert("Items imported successfully");
        } else {
          console.error(res);
          alert(res.message || "oops a problem has occurred");
        }
      });
    }
  };

  render = () => {
    const {
      classes,
      cycles,
      divisions,
      filter,
      onChangeFilter,
      cannedFilters,
      onAddCannedFilter,
      onRemoveCannedFilter,
      subdivisions
    } = this.props;
    return (
      <Grid className={classes.root}>
        <Grid item>
          <Select
            className={classes.selectFilter}
            id="cycleId"
            name="cycleId"
            value={filter.cycleId}
            onChange={onChangeFilter}
            displayEmpty={true}
          >
            <MenuItem value="" disabled>
              <InputLabel>
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
              <InputLabel>
                Division
              </InputLabel>
            </MenuItem>
            {divisions.map((option, index) => (
              <MenuItem key={index} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
          <Select
            className={classes.selectFilter}
            id="subdivisionId"
            name="subdivisionId"
            value={filter.subdivisionId}
            onChange={onChangeFilter}
            displayEmpty={true}
          >
            <MenuItem value="" disabled>
              <InputLabel>
                Subdivision
              </InputLabel>
            </MenuItem>
            {subdivisions.map((option, index) => (
              <MenuItem key={index} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
          {filter.cycleId !== "" &&
            filter.divisionId !== "" &&
            filter.divisionId !== "ALL" &&
            filter.subdivisionId !== "" && (
              <Button
                color="primary"
                variant="contained"
                className={classes.button}
                onClick={this.onClick}
              >
                <Icon className={classes.rightIcon}>save_alt</Icon>
                import
              </Button>
            )}
          <input
            className={classes.inputButton}
            id="button-file"
            ref="buttonFile"
            type="file"
            onChange={this.handleConfirm}
          />
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
  };
}

Filter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Filter);
