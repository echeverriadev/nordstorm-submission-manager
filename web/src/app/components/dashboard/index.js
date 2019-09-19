import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PrimaryAppBar from "../../components/shared/PrimaryAppBar";
import TabMenu from "./TabMenu";
import Layaout from "./Layaout";
import SnackbarBase from "../common/Snackbar/SnackbarBase";

import {
  getItemsApi,
  patchItemApi,
  storeItemApi,
  getCyclesApi,
  getDivisionsApi,
  deleteItemApi,
  duplicateItemApi,
  getSubDivisionsApi,
  postCycleSubDivisionApi
} from "../../../api";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

const initialNewItem = {
  nmg_priority: 0,
  department_number: "",
  vpn: "",
  brand: "",
  color: "",
  size: "",
  description: "",
  image: null,
  style_group_number: "",
  in_stock_week: "",
  sale_price: "",
  //EXTRA
  category: [],
  _fk_cycle: null,
  retail_price: null,
  is_priority: null,
  available_in_canada: null,
  price_cad: null,
  country_of_origin: "",
  country_of_origin_other: "",
  request_extension: null,
  request_extension_note: "",
  request_cancellation: null,
  request_cancellation_notes: "",
  tagged_missy: 0,
  tagged_encore: 0,
  tagged_petite: 0,
  tagged_extended: 0,
  imageExtension: "",
  newItemImage: process.env.REACT_APP_BASE_IMAGE
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      cycles: [],
      divisions: [],
      subdivisions: [],
      rows: [],
      addItem: initialNewItem,
      total: 0,
      offset: 0,
      filter: {
        cycleId: "",
        divisionId: "",
        subdivisionId: "",
        search: ""
      },
      cannedFilters: [],
      order: {
        field: "",
        criterion: ""
      },
      // We set a default limit in case an error ocurred when fetching
      //  the cycle_subdivision items limit in question
      cycleSubDivisionItemsLimit: 0,
      email: {
        address: "",
        subject: ""
      },
      counter: 1,
      snackbar: {
        open: false,
        snackbarType: "info",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        duration: 5000,
        message: "Attaching items or this cycle and division to stories"
      }
    };
  }

  showCustomSnackbar = (type, duration, message) => {
    this.setState({
      snackbar: {
        open: true,
        snackbarType: type,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        duration,
        message
      }
    });
  };

  componentWillMount = () => {
    this.fetchCyclesApi();
    this.fetchDivisionsApi();
  };

  componentDidUpdate(_, prevProps) {
    if (
      prevProps.rows &&
      this.state.stored &&
      prevProps.rows.length != this.state.rows.length
    ) {
      this.updateScroll();
      this.setState({ stored: false });
    }
  }

  updateScroll() {
    let value = document.body.scrollHeight + 100;
    window.scrollTo(0, value);
  }

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  onAddChange = (key, value) => {
    this.setState({
      addItem: {
        ...this.state.addItem,
        [key]: value
      }
    });
  };

  onSubmit = () => {
    const { filter, addItem } = this.state;
    const { divisionId, cycleId, subdivisionId } = filter;
    const addItemApi = {
      ...addItem,
      _fk_division: divisionId,
      _fk_cycle: cycleId,
      _fk_subdivision: subdivisionId
    };

    if (addItem.image !== null) {
      initialNewItem.image = null;
    }

    storeItemApi(addItemApi).then(
      response => {
        if (response.code === 200) {
          this.setState({
            addItem: initialNewItem
          });
          this.fetchItemsApi();
          this.setState({ stored: true });
          this.handleSnackbarOpen("success", "Item saved successfully");
        } else {
          console.error(response.message);
          this.handleSnackbarOpen("error", "Error saving item");
        }
        console.log(response);
      },
      err => {
        console.error(err);
      }
    );
  };

  onChange = (index, key, value) => {
    console.log("changing ...");
    const rows = this.state.rows;
    const noKeyPressed = [
      "nmg_priority",
      "in_stock_week",
      "_fk_cycle",
      "tagged_missy",
      "tagged_encore",
      "country_of_origin",
      "tagged_encore",
      "tagged_petite",
      "tagged_extended",
      "available_in_canada",
      "request_extension",
      "request_cancellation"
    ];
    var row = rows[index];
    row[key] = value;
    if (key !== "image") {
      row = Object.assign({}, row, {
        fieldModified: Object.assign({}, row.fieldModified, {
          [key]: value
        })
      });
    }
    rows.splice(index, 1, row);
    this.setState({ rows });
    /*
    if (noKeyPressed.indexOf(key) !== -1) {
      this.fetchPatchItemApi(row.id, row, index);
    }
    */
  };

  onBlurItem = (e, index, localItem, item) => {
    console.log(localItem);
    console.log(item);
    console.log("bluring item...");
    /*
    const rows = this.state.rows;
    const noKeyPressed = [
      "nmg_priority",
      "in_stock_week",
      "_fk_cycle",
      "tagged_missy",
      "tagged_encore",
      "country_of_origin",
      "tagged_encore",
      "tagged_petite",
      "tagged_extended",
      "available_in_canada",
      "request_extension",
      "request_cancellation"
    ];
    var row = rows[index];
    row[key] = value;
    if (key !== "image") {
      row = Object.assign({}, row, {
        fieldModified: Object.assign({}, row.fieldModified, {
          [key]: value
        })
      });
    }
    rows.splice(index, 1, row);
    this.setState({ rows });
    if (index != null && index != undefined) {
      const rows = this.state.rows;
      const row = rows[index];
      console.log("ITEM", row);
      this.fetchPatchItemApi(row.id, row, index);
    }
    */
  };

  onKeyPressItem = (index, key, event) => {
    const rows = this.state.rows;
    var row = rows[index];
    row[key] = event.target.value;
    row = Object.assign({}, row, {
      fieldModified: Object.assign({}, row.fieldModified, {
        [key]: event.target.value
      })
    });
    rows.splice(index, 1, row);
    this.setState({ rows });

    if (key === "is_priority") {
      console.log(event.keyCode);
      var keycode = event.keyCode ? event.keyCode : event.which;
      if (keycode === 13) {
        this.fetchPatchItemApi(row.id, row, index);
      }
    }
  };

  fetchPatchItemApi = (id, item, index) => {
    console.log("PATCH", item);
    patchItemApi(id, item).then(
      response => {
        if (response.status === 200) {
          const rows = this.state.rows;
          const row = Object.assign({}, rows[index], {
            fieldModified: null
          });
          rows.splice(index, 1, row);
          this.setState({ rows });
        }
        if (response.refresh) {
          this.fetchItemsApi();
        }
      },
      err => {
        console.log(err);
      }
    );
  };

  changePagination = offset => {
    this.setState({ offset }, this.fetchItemsApi);
  };

  changeFilter = ({ target }) => {
    const filter = { ...this.state.filter };
    filter[target.name] = target.value;

    if (target.name === "divisionId") {
      let divisionId = target.value;
      filter.subdivisionId = "";
      this.fetchSubDivisions(divisionId);
      this.setState({
        isChangingFilter: false,
        rows: [],
        total: 0
      });
    }

    const { cycleId, divisionId, subdivisionId } = filter;

    // We check if the row for the chosen cycle and subdivision exists, if not, we created it
    if (cycleId && divisionId && subdivisionId) {
      this.addCycleSubDivisionRow(cycleId, subdivisionId);
    }

    this.setState(
      {
        filter,
        offset: 0,
        isChangingFilter: true
      },
      this.fetchItemsApi
    );
  };

  addCycleSubDivisionRow(cycleId, subdivisionId) {
    let data = {
      cycleId,
      subdivisionId
    };

    postCycleSubDivisionApi(data).then(
      response => {
        if (response.code === 200) {
          let model = response.model;
          this.setState({
            cycleSubDivisionItemsLimit: model.submissions_limit,
            email: response.emailData
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  fetchSubDivisions(divisionId) {
    let _this = this;
    setTimeout(function() {
      getSubDivisionsApi(divisionId).then(
        response => {
          if (response.status === 200) {
            _this.setState({
              filter: {
                cycleId: _this.state.filter.cycleId,
                divisionId: _this.state.filter.divisionId,
                subdivisionId: "",
                search: _this.state.filter.search
              },
              subdivisions: response.data
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    }, 100);
  }

  changeOrder = fieldClicked => {
    const { order } = this.state;
    if (order.field === fieldClicked)
      order.criterion = order.criterion === "ASC" ? "DESC" : "ASC";
    else {
      order.criterion = "ASC";
      order.field = fieldClicked;
    }
    this.setState({ order }, this.fetchItemsApi);
  };

  addCannedFilter = value => {
    let cannedFilters = [...this.state.cannedFilters];
    cannedFilters.push(value);
    this.setState(
      {
        cannedFilters
      },
      this.fetchItemsApi
    );
  };

  removeCannedFilter = index => {
    let cannedFilters = [...this.state.cannedFilters];
    cannedFilters.splice(index, 1);
    this.setState(
      {
        cannedFilters
      },
      this.fetchItemsApi
    );
  };

  fetchItemsApi = () => {
    const { offset, filter, order } = this.state;
    const { divisionId, cycleId, subdivisionId } = filter;
    let orderString = "";
    if (order.field && order.criterion)
      orderString = Object.values(order).toString();
    if (divisionId && cycleId && subdivisionId) {
      const limit = 10;
      const end = limit - 1 + offset;
      const parseCannedFilters = this.parseCannedFilters();
      const parsedFilter = {
        ...filter,
        parseCannedFilters
      };

      getItemsApi(offset, end, parsedFilter, orderString).then(
        response => {
          if (response.status === 200)
            this.setState({
              isChangingFilter: false,
              rows: response.data,
              total: response.total
            });
          else this.setState({ isChangingFilter: false });
        },
        err => {
          console.log(err);
        }
      );
    }
  };

  parseCannedFilters = () => {
    const { cannedFilters } = this.state;
    let parsedFilters = [];
    for (let filter of cannedFilters) parsedFilters.push(filter.where);
    return parsedFilters;
  };

  fetchCyclesApi = () => {
    getCyclesApi().then(
      response => {
        if (response.status === 200) this.setState({ cycles: response.data });
      },
      err => {
        console.log(err);
      }
    );
  };

  fetchDivisionsApi = () => {
    getDivisionsApi().then(
      response => {
        if (response.status === 200)
          this.setState({ divisions: response.data });
      },
      err => {
        console.log(err);
      }
    );
  };

  handleDeleteItemApi = id => {
    deleteItemApi(id).then(
      response => {
        if (response.status === 200) this.fetchItemsApi();
      },
      err => {
        console.log(err);
      }
    );
  };

  handleDuplicateItemApi = id => {
    duplicateItemApi(id).then(
      response => {
        this.showCustomSnackbar(
          "success",
          5000,
          "Item duplicated successfully."
        );
        if (response.status === 200) {
          this.fetchItemsApi();
        }
      },
      err => {
        this.showCustomSnackbar("error", 5000, "Item duplication failed.");
        console.log(err);
      }
    );
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
        duration: 5000,
        message: message
      }
    });
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    let snackbar = Object.assign({}, this.state.snackbar, {
      open: false
    });

    this.setState({
      snackbar
    });
  };

  render() {
    const {
      value,
      cycles,
      divisions,
      rows,
      addItem,
      total,
      offset,
      filter,
      cannedFilters,
      order,
      isChangingFilter,
      subdivisions,
      cycleSubDivisionItemsLimit,
      email,
      snackbar
    } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <PrimaryAppBar />
        <SnackbarBase
          anchorOrigin={snackbar.anchorOrigin}
          duration={snackbar.duration}
          message={snackbar.message}
          snackbarType={snackbar.snackbarType}
          onClose={this.handleSnackbarClose}
          open={snackbar.open}
        />
        <TabMenu value={value} handleChange={this.handleTabChange} />
        {value === 0 && (
          <Layaout
            isChangingFilter={isChangingFilter}
            items={rows}
            cycles={cycles}
            divisions={divisions}
            subdivisions={subdivisions}
            addItem={addItem}
            total={total}
            offset={offset}
            cannedFilters={cannedFilters}
            filter={filter}
            order={order}
            onChange={this.onChange}
            onBlurItem={this.onBlurItem}
            onAddChange={this.onAddChange}
            onSubmit={this.onSubmit}
            onChangePagination={this.changePagination}
            onChangeFilter={this.changeFilter}
            onChangeOrder={this.changeOrder}
            onAddCannedFilter={this.addCannedFilter}
            onRemoveCannedFilter={this.removeCannedFilter}
            onRefreshItems={this.fetchItemsApi}
            onSeleteItem={this.handleDeleteItemApi}
            onSuplicateItem={this.handleDuplicateItemApi}
            cycleSubDivisionItemsLimit={cycleSubDivisionItemsLimit}
            email={email}
          />
        )}
        {value === 1 && <h1>SAMPLE</h1>}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Dashboard);
