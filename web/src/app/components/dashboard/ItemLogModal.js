import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import {
  MenuItem,
  Modal,
  Typography,
  Grid,
  List,
  ListItem,
  Divider,
  ListItemText,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { getItemlogsApi } from "../../../api";
import "../Utils/dashboardCustom.css";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    width: "50%",
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing(75),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: "none"
  },
  titleModal: {
    backgroundColor: "#004F7A",
    color: "white",
    padding: "10px"
  },
  headTable: {
    color: theme.palette.primary.main,
    fontWeight: "bold"
  },
  selected: {
    backgroundColor: theme.palette.primary.main + "!important",
    color: "white !important"
  },
  list: {
    padding: 0,
    borderRight: "1px solid rgba(0, 0, 0, 0.12)"
  },
  tableCell: {
    borderBottom: "none"
  },
  labelLog: {
    color: "#929191",
    marginLeft: "-56%"
  },
  divLog: {
    padding: "2%"
  },
  itemLogsScroll: {
    position: "relative",
    height: "calc(90vh - 25px - 40px - 40px)",
    overflowY: "auto",
    overflowX: "hidden",
    background: "#fff",
    padding: "0px !important",
    marginLeft: "32px",
    marginTop: "32px",
    marginBottom: "5%"
  },
  thead: {
    float: "right",
    width: "88%"
  },
  throws: {
    paddingRight: "165px"
  },
  fixed_header_tbody: {
    display: "block",
    overflow: "auto",
    height: "200px",
    width: "100%",
    height: "calc(90vh - 25px - 40px - 40px)"
  },
  textBold: {
    fontWeight: "bold !important"
  },
  hrCustom: {
    marginBottom: "-7px",
    marginTop: 0,
    color: "white"
  }
});

class ItemLogModal extends React.Component {
  state = {
    open: false,
    selected: null,
    details: {},
    itemLogs: []
  };

  componentWillUnmount() {
    var menu = document.getElementById("menu_dot");
    if (menu != null) {
      menu.style.display = "none";
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
    this.fetchPatchItemApi();
    document.getElementsByClassName("MuiMenu-paper")[0].hidden = true;
  };

  fetchPatchItemApi = () => {
    const { itemId } = this.props;
    getItemlogsApi(itemId)
      .then(response => {
        if (response.status === 200) console.log("items_log", response.data);
        this.setState({
          itemLogs: response.data
        });
      })
      .catch(console.error);
  };

  handleClose = () => {
    this.props.popupState.close();
    this.setState({ open: false });
  };

  handleListItemClick = (event, index) => {
    console.log(this.state.itemLogs[index].event == " Edited");
    console.log("ITEM_LOG", this.state.itemLogs[index]);
    var details;
    if (
      this.state.itemLogs[index].event.replace(" ", "") == "duplicated" ||
      String(this.state.itemLogs[index].event) == " Created" ||
      String(this.state.itemLogs[index].event) == " Created "
    ) {
      details = {
        brand: this.props.itemLog.brand,
        live_date:
          this.props.itemLog.live_date != " " &&
          this.props.itemLog.live_date != "NULL" &&
          this.props.itemLog.live_date != null
            ? this.props.itemLog.live_date
            : " "
      };
    } else {
      if (String(this.state.itemLogs[index].event) == " Edited") {
        details = JSON.parse(this.state.itemLogs[index].details);
      }
    }
    this.setState({
      selected: index,
      details: details ? details : this.state.itemLogs[index].details
    });
  };

  render() {
    const { classes } = this.props;
    const { open, selected, details, itemLogs } = this.state;
    const closeIcon = {
      cursor: "pointer",
      float: "right",
      marginTop: "15px",
      width: "30px",
      position: "relative",
      color: "white",
      fontWeight: "bold",
      marginRight: "8px"
    };

    return (
      <div>
        <MenuItem onClick={this.handleOpen}>Log</MenuItem>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <div>
              <label onClick={this.handleClose} style={closeIcon}>
                X
              </label>
            </div>
            <Typography
              className={classes.titleModal}
              variant="h6"
              id="modal-title"
            >
              Item Edit Log
            </Typography>
            <Grid container spacing={8}>
              <Grid
                item
                xs={4}
                className={classes.itemLogsScroll}
                style={{ marginTop: "17px" }}
              >
                <List className={classes.list}>
                  {itemLogs && itemLogs.length > 0
                    ? itemLogs.map((item, index) => (
                        <React.Fragment key={index}>
                          <ListItem
                            classes={{ selected: classes.selected }}
                            alignItems="flex-start"
                            button
                            selected={selected === index}
                            onClick={event =>
                              this.handleListItemClick(event, index)
                            }
                          >
                            <ListItemText
                              primary={item.user_name}
                              classes={{ primary: classes.textBold }}
                              primaryTypographyProps={{
                                color: "inherit"
                              }}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    component="span"
                                    variant="caption"
                                    style={
                                      selected === index
                                        ? { color: "white" }
                                        : { color: "black" }
                                    }
                                  >
                                    {item.time_stamp}
                                  </Typography>
                                  <br />
                                  <Typography
                                    component="span"
                                    variant="caption"
                                    style={
                                      selected === index
                                        ? { color: "white" }
                                        : { color: "black" }
                                    }
                                  >
                                    {item.event}
                                  </Typography>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          {index !== itemLogs.length - 1 && (
                            <Divider component="li" />
                          )}
                        </React.Fragment>
                      ))
                    : ""}
                </List>
              </Grid>
              <Grid
                item
                xs={8}
                style={{ marginLeft: "-10%", marginTop: "-18px" }}
              >
                <Table
                  className={classes.table}
                  size="small"
                  style={{ width: "109%", border: "none" }}
                >
                  <TableHead
                    className={classes.thead}
                    style={{ display: "block", border: "none" }}
                  >
                    <TableRow>
                      <TableCell
                        className={classes.headTable}
                        style={{
                          width: "218px",
                          paddingRight: "0 !important",
                          border: "none"
                        }}
                      >
                        Field
                      </TableCell>
                      <TableCell
                        style={{ border: "none" }}
                        className={classes.headTable}
                      >
                        New Value
                      </TableCell>
                    </TableRow>
                    <hr className={classes.hrCustom} />
                  </TableHead>
                  <TableBody
                    className={classes.fixed_header_tbody}
                    style={{ display: "block" }}
                  >
                    {Object.keys(details).map((key, index) => (
                      <TableRow style={{ display: "block" }} key={index}>
                        <TableCell
                          style={{
                            color: "gray",
                            paddingLeft: "73px",
                            width: "291px",
                            border: "none"
                          }}
                          className={classes.tableCell}
                        >
                          {key}
                        </TableCell>
                        <TableCell
                          style={{
                            color: "gray",
                            paddingLeft: "0",
                            border: "none"
                          }}
                          className={classes.tableCell}
                        >
                          <p style={{ textAlign: "left" }}>{details[key]}</p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

ItemLogModal.propTypes = {
  classes: PropTypes.object.isRequired
};

const ItemLogModalWrapped = withStyles(styles)(ItemLogModal);

export default ItemLogModalWrapped;
