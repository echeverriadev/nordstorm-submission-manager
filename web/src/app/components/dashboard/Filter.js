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
import { ExcelRenderer } from "react-excel-renderer";
import "./confirmAlert.css";
import SnackbarBase from "../common/Snackbar/SnackbarBase";
import fitService from "../../services/fit.service";

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
  constructor(props) {
    super(props);
    this.state = {
      cols: [],
      rows: [],
      counter: 0,
      snackbar: {
        open: false,
        snackbarType: "info",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        duration: 2000,
        message: "Attaching items or this cycle and division to stories"
      }
    };
  }
  td(rows, index) {
    var elements = [];
    for (var i = 1; i <= rows.length - 1; i++) {
      elements.push(<td key={i}>{rows[i][index]}</td>);
    }
    return elements;
  }

  closeModal() {}

  handleConfirm = e => {
    const file = Array.from(e.target.files)[0];
    if (file) {
      //If there is a file selected}
      this.refs.buttonFile.value = "";
      ExcelRenderer(file, (err, resp) => {
        if (err) {
          console.log(err);
        } else {
          const cols_name = resp.rows[0];
          const rows_value = resp.rows.filter(index => index != 0);
          return (
            <div>
              {confirmAlert({
                customUI: () => {
                  return (
                    <div>
                      <div
                        style={{
                          backgroundColor: "#ededed",
                          maxWidth: "1120px",
                          maxHeight: "420px",
                          borderRadius: "10px",
                          padding: "15px",
                          paddingBottom: "25px"
                        }}
                      >
                        <label
                          style={{
                            fontWeight: "bold",
                            fontSize: "x-large",
                            color: "#888484",
                            marginLeft: "22px"
                          }}
                        >
                          {" "}
                          Import items{" "}
                        </label>
                        <div style={{ marginLeft: "21px" }}>
                          <label>
                            {" "}
                            You are going to import {rows_value.length - 1}{" "}
                            items{" "}
                          </label>
                        </div>
                        <div className="table-custom">
                          <table style={{ whiteSpace: "nowrap" }}>
                            <tbody>
                              {cols_name && cols_name.length > 0 ? (
                                cols_name.map((column_name, index) => (
                                  <tr>
                                    <th
                                      align="left"
                                      style={{
                                        position: "sticky",
                                        left: "0",
                                        backgroundColor: "#c1c1c1",
                                        borderBottom: "1px #ededed solid"
                                      }}
                                    >
                                      {column_name}
                                    </th>
                                    {this.td(rows_value, index).map(
                                      element => element
                                    )}
                                  </tr>
                                ))
                              ) : (
                                <tr> </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                        <div>
                          {/* <label style={{marginTop: "10px", fontWeight: "bold", display:"flex", justifyContent:"flex-end", marginRight: "45px" }}>Do you want continue?</label> */}

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              marginRight: "45px"
                            }}
                          >
                            <button
                              style={{
                                border: "none",
                                backgroundColor: "#00838c",
                                color: "white",
                                width: "70px",
                                height: "30px",
                                marginRight: "15px"
                              }}
                              onClick={() => this.onSubmit(file)}
                            >
                              {" "}
                              Import{" "}
                            </button>
                            <button
                              style={{
                                border: "none",
                                backgroundColor: "rgb(136, 132, 132)",
                                color: "white",
                                width: "70px",
                                height: "30px"
                              }}
                              onClick={() => this.closeModal()}
                            >
                              {" "}
                              Cancel{" "}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          );
        }
      });
    }
  };

  onClick = () => {
    const { totalItems, cycleSubDivisionItemsLimit } = this.props;
    if (totalItems >= cycleSubDivisionItemsLimit) {
      alert(
        "Item count limit has already been reached for this subdivision. Import cannot proceed."
      );
      return;
    }
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
        filter: { divisionId, cycleId, subdivisionId }
      } = this.props;

      const { totalItems } = this.props;

      const formData = new FormData();

      formData.append("file", file);
      formData.append("_fk_division", divisionId);
      formData.append("_fk_cycle", cycleId);
      formData.append("_fk_subdivision", subdivisionId);
      formData.append("totalItems", totalItems);

      uploadExcelApi(formData).then(res => {
        if (res.code === 200) {
          this.props.onRefreshItems(); //Refresh list for getting all new items
          alert(res.message);
        } else {
          console.error(res);
          alert(res.message || "oops a problem has occurred");
        }
      });
    }
  };

  renderSubdivisions() {
    const { subdivisions } = this.props;

    return subdivisions.map((subdivision, index) => {
      return (
        <MenuItem value={subdivision.id} key={index} name={subdivision.name}>
          {subdivision.name}
        </MenuItem>
      );
    });
  }

  attachItemsToStories = () => {
    const { filter } = this.props;
    this.handleSnackbarOpen();
    let pkCycle = filter.cycleId;
    let pkDivision = filter.divisionId;
    let _this = this;

    fitService
      .attachItemsToStories(pkCycle, pkDivision)
      .then(response => {
        let data = response.data;
        _this.handleSnackbarClose();

        if (data.result) {
          _this.handleSnackbarOpen(
            "success",
            "Completed attaching items to stories"
          );
        } else {
          _this.handleSnackbarOpen(
            "error",
            `Error attaching Items to stories: ${data.message}`
          );
        }
      })
      .catch(error => {
        console.log(error);
        this.handleSnackbarOpen("error", error);
      });
  };

  handleSnackbarOpen = (
    type = "info",
    message = "Attaching items or this cycle and division to stories"
  ) => {
    this.setState({
      snackbar: {
        open: true,
        snackbarType: type,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        duration: 2000,
        message: message
      }
    });
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      snackbar: {
        open: false,
        snackbarType: "info",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        duration: 2000,
        message: "Attaching items or this cycle and division to stories"
      }
    });
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
      onRemoveCannedFilter
    } = this.props;

    const { snackbar } = this.state;
    console.log(snackbar);
    return (
      <React.Fragment>
        <SnackbarBase
          anchorOrigin={snackbar.anchorOrigin}
          duration={snackbar.duration}
          message={snackbar.message}
          snackbarType={snackbar.snackbarType}
          onClose={this.handleSnackbarClose}
          open={snackbar.open}
        />
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
                <InputLabel>Cycle / Month</InputLabel>
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
                <InputLabel>Division</InputLabel>
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
                <InputLabel>Subdivision</InputLabel>
              </MenuItem>
              {this.renderSubdivisions()}
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
          <Grid item>
            {filter.cycleId !== "" &&
              filter.divisionId !== "" &&
              filter.divisionId !== "ALL" && (
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  onClick={this.attachItemsToStories}
                  style={{ width: 200, marginLeft: 5 }}
                >
                  Attach to Stories
                </Button>
              )}
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
      </React.Fragment>
    );
  };
}

Filter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Filter);
