import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import PopupState, {
  bindTrigger,
  bindMenu
} from "material-ui-popup-state/index";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Accordion from "./Accordion";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Dropzone from "react-dropzone";
import { uploadImagePatchApi } from "../../../../api";
import NumberFormat from "react-number-format";
import ItemLogModal from "../ItemLogModal";
import ItemDeleteDialog from "../ItemDeleteDialog";
import * as fisHelper from "../../../../helpers/Fis";
import _ from "lodash";

const styles = theme => ({
  card: {
    width: "100%",
    marginBottom: "2px"
  },
  cardContent: {
    width: "100%",
    margin: 0,
    padding: 0,
    maxHeight: 110,
    marginTop: "20px"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: theme.spacing(12),
    Maxheight: theme.spacing(13)
  },
  row: {
    maxHeight: "50%"
  },
  botton: {
    padding: 0,
    margin: 0
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    paddingBottom: theme.spacing(4),
    width: "80%",
    marginTop: 32
  },
  selectStock: {
    marginBottom: theme.spacing(1),
    width: "81px",
    paddingBottom: "2px",
    fontSize: "13px"
  },
  selectNGM: {
    marginBottom: theme.spacing(1),
    paddingBottom: 0,
    fontSize: "13px"
  },
  tagLabel: {
    padding: 1,
    margin: 0,
    display: "inline"
  },
  tagField: {
    padding: "2px 7px",
    margin: "0 0 0 9px",
    backgroundColor: "#EFEFEF",
    color: "#85aed5",
    borderRadius: 3,
    textTransform: "capitalize"
  },
  inputFont: {
    fontSize: "13px"
  },
  input: {
    "&::placeholder": {
      color: "red",
      opacity: 0.75
    }
  },
  labelFont: {
    fontSize: "13px"
  },
  IconButton: {
    color: "rgba(0, 0, 0, 0.9)"
  },
  cardCellCustom: {
    width: "100%",
    marginTop: "1%",
    marginBottom: "1%"
  },
  extPadding: {
    paddingLeft: "21px"
  }
});

function NumberFormatCustom(props) {
  const { inputRef, onChange, name, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        if (values.value === "") values.value = "";
        onChange({
          target: {
            value: values.value,
            name
          }
        });
      }}
      name={name}
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

const itemSelects = fisHelper.getItemSelects();
const itemChecks = fisHelper.getItemChecks();
const itemChips = fisHelper.getItemChips();

class CardCell extends React.Component {
  state = {
    expanded: false,
    isOpen: false,
    preview: null,
    localItem: { ...this.props.item }
  };

  duplicate = close => {
    alert("Hola Mundo");
    close();
  };

  onDrop = files => {
    const file = files[0];
    if (file.type.split("/")[0] === "image") {
      const formData = new FormData();

      formData.append("file", file);

      this.setState({ preview: URL.createObjectURL(files[0]) });
      uploadImagePatchApi(formData, this.props.item.id)
        .then()
        .then(res => {
          if (res.code === 200) console.log(res.data.url);
          else {
            console.error(res);
            alert(res.message || "oops a problem has occurred");
          }
        });
    } else {
      alert("Invalid Format");
    }
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleDuplicateItem = (id, popupState) => {
    const { onDuplicateItem } = this.props;
    popupState.close();
    onDuplicateItem(id);
  };

  handleVpnLookup = (localItem, item, popupState) => {
    const { onVpnLookup } = this.props;
    popupState.close();

    if (localItem.department_number !== "" && localItem.vpn !== "") {
      onVpnLookup(localItem, item);
    }
  };

  onHandleOpenModal = popupState => {
    popupState.close();
  };

  onBlurInput = (e, index, item) => {
    if (this.state.localItem === null) {
      this.setState({
        localItem: item
      });
    }

    this.props.onBlurItem(e, index, this.state.localItem, item);
  };

  renderTag(data, tagName = "") {
    const { classes } = this.props;
    if (data !== null && data !== "") {
      return (
        <div className={classes.tagLabel}>
          <p className={classes.tagField}>{tagName + data.toLowerCase()}</p>
        </div>
      );
    } else {
      return <div />;
    }
  }

  handlerItemChange = (event, localItem, item) => {
    console.log(event);
    localItem[event.target.name] = event.target.value;
    this.setState({
      localItem: localItem
    });

    let selectIndex = _.findIndex(itemSelects, function(o) {
      return event.target.name === o;
    });

    if (selectIndex !== -1) {
      this.props.onChange(event.target.name, localItem, item);
    }

    let checkIndex = _.findIndex(itemChecks, function(o) {
      return event.target.name === o;
    });

    if (checkIndex !== -1) {
      let checkValue = event.target.value === "false" ? 1 : 0;
      localItem[event.target.name] = checkValue;
      this.props.onChange(event.target.name, localItem, item);
    }

    let chipIndex = _.findIndex(itemChips, function(o) {
      return event.target.name === o;
    });

    if (chipIndex !== -1) {
      localItem[event.target.name] = event.target.value;
      this.props.onChange(event.target.name, localItem, item);
    }
  };

  render() {
    const {
      classes,
      item,
      index,
      onChange,
      onKeyPressItem,
      cycles,
      onDeleteItem,
      isChangingFilter,
      onBlurItem
    } = this.props;

    const { localItem } = this.state;

    return (
      <Card className={classes.cardCellCustom}>
        <CardContent className={classes.cardContent}>
          <Grid container>
            <Grid item md={1}>
              {!this.state.expanded ? (
                this.state.isOpen ? (
                  <Lightbox
                    mainSrc={item.image}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                  />
                ) : (
                  <img
                    className={classes.img}
                    alt="complex1"
                    src={item.image}
                    onClick={() => this.setState({ isOpen: true })}
                  />
                  // <MyModal/>
                  // <SimpleModal/>
                )
              ) : (
                <Dropzone onDrop={this.onDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <img
                          className={classes.img}
                          alt="complex"
                          src={
                            this.state.preview ? this.state.preview : item.image
                          }
                        />
                      </div>
                    </section>
                  )}
                </Dropzone>
              )}
            </Grid>
            <Grid item md={11}>
              <Grid
                className={classes.row}
                container
                direction="row"
                alignContent="center"
                alignItems="center"
              >
                <Grid item md={1} className={classes.extPadding}>
                  <Select
                    inputProps={{
                      className: classes.inputFont
                    }}
                    className={classes.selectNGM}
                    value={
                      localItem.nmg_priority === null
                        ? 0
                        : localItem.nmg_priority
                    }
                    onChange={e => this.handlerItemChange(e, localItem, item)}
                    name="nmg_priority"
                    displayEmpty
                  >
                    <MenuItem value={0} disabled>
                      Priority
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </Grid>
                <Grid item md={1}>
                  <TextField
                    InputProps={{
                      className: classes.inputFont,
                      classes: { input: classes.input }
                    }}
                    InputLabelProps={{
                      className: classes.labelFont
                    }}
                    id={"department_number" + index}
                    placeholder="Dept #*"
                    className={classes.textField}
                    name="department_number"
                    margin="normal"
                    value={localItem.department_number}
                    onChange={e => this.handlerItemChange(e, localItem)}
                    onBlur={(e, index) => this.onBlurInput(e, index, item)}
                    required
                    error={!localItem.department_number}
                  />
                </Grid>
                <Grid item md={1}>
                  <TextField
                    InputProps={{
                      className: classes.inputFont,
                      classes: { input: classes.input }
                    }}
                    InputLabelProps={{
                      className: classes.labelFont
                    }}
                    id={"vpn" + index}
                    name={"vpn"}
                    placeholder="VPN*"
                    className={classes.textField}
                    margin="normal"
                    value={localItem.vpn}
                    onChange={e => this.handlerItemChange(e, localItem)}
                    onBlur={(e, index) => this.onBlurInput(e, index, item)}
                    required
                    error={!localItem.vpn}
                  />
                </Grid>
                <Grid item md={1}>
                  <TextField
                    InputProps={{
                      className: classes.inputFont
                    }}
                    InputLabelProps={{
                      className: classes.labelFont
                    }}
                    id={"style_group_number" + index}
                    placeholder="SG#"
                    className={classes.textField}
                    color="primary"
                    margin="normal"
                    name="style_group_number"
                    value={localItem.style_group_number}
                    onChange={e => this.handlerItemChange(e, localItem)}
                    onBlur={(e, index) => this.onBlurInput(e, index, item)}
                  />
                </Grid>
                <Grid item md={1}>
                  <TextField
                    InputProps={{
                      className: classes.inputFont,
                      classes: { input: classes.input }
                    }}
                    InputLabelProps={{
                      className: classes.labelFont
                    }}
                    id={"brand" + index}
                    placeholder="Brand*"
                    className={classes.textField}
                    margin="normal"
                    name="brand"
                    value={localItem.brand}
                    onChange={e => this.handlerItemChange(e, localItem)}
                    onBlur={(e, index) => this.onBlurInput(e, index, item)}
                    required
                    error={!item.brand}
                  />
                </Grid>
                <Grid item md={1}>
                  <TextField
                    InputProps={{
                      className: classes.inputFont
                    }}
                    InputLabelProps={{
                      className: classes.labelFont
                    }}
                    id={"color" + index}
                    placeholder="Color"
                    className={classes.textField}
                    margin="normal"
                    value={localItem.color}
                    name="color"
                    onChange={e => this.handlerItemChange(e, localItem)}
                    onBlur={(e, index) => this.onBlurInput(e, index, item)}
                  />
                </Grid>
                <Grid item md={1}>
                  <TextField
                    InputProps={{
                      className: classes.inputFont
                    }}
                    InputLabelProps={{
                      className: classes.labelFont
                    }}
                    id={"size" + index}
                    placeholder="Size"
                    className={classes.textField}
                    margin="normal"
                    value={localItem.size}
                    name="size"
                    onChange={e => this.handlerItemChange(e, localItem)}
                    onBlur={(e, index) => this.onBlurInput(e, index, item)}
                  />
                </Grid>
                <Grid item md={2}>
                  <TextField
                    InputProps={{
                      className: classes.inputFont
                    }}
                    InputLabelProps={{
                      className: classes.labelFont
                    }}
                    id={"description" + index}
                    placeholder="Item Description"
                    className={classes.textField}
                    margin="normal"
                    //multiline
                    //rows={2}
                    name="description"
                    value={localItem.description}
                    onChange={e => this.handlerItemChange(e, localItem)}
                    onBlur={(e, index) => this.onBlurInput(e, index, item)}
                  />
                </Grid>
                <Grid item md={1}>
                  <Select
                    inputProps={{
                      className: classes.inputFont
                    }}
                    className={classes.selectStock}
                    value={
                      localItem.in_stock_week === null
                        ? 0
                        : localItem.in_stock_week
                    }
                    onChange={e => this.handlerItemChange(e, localItem, item)}
                    name="in_stock_week"
                    displayEmpty
                  >
                    <MenuItem value={""} disabled>
                      In Stock
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </Grid>
                <Grid item md={1}>
                  <TextField
                    InputProps={{
                      className: classes.inputFont,
                      inputComponent: NumberFormatCustom
                    }}
                    InputLabelProps={{
                      className: classes.labelFont
                    }}
                    id={"retail_price" + index}
                    placeholder="Price"
                    className={classes.textField}
                    margin="normal"
                    name="retail_price"
                    value={localItem.retail_price}
                    onChange={e => this.handlerItemChange(e, localItem)}
                    onBlur={(e, index) => this.onBlurInput(e, index, item)}
                  />
                </Grid>
                <Grid item md={1}>
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {popupState => (
                      <React.Fragment>
                        <IconButton
                          variant="contained"
                          {...bindTrigger(popupState)}
                        >
                          <MoreVertIcon className={classes.IconButton} />
                        </IconButton>
                        <Menu {...bindMenu(popupState)}>
                          <MenuItem
                            onClick={e =>
                              this.handleDuplicateItem(item.id, popupState)
                            }
                          >
                            Duplicate
                          </MenuItem>
                          <ItemLogModal
                            itemId={item.id}
                            itemLog={item}
                            popupState={popupState}
                          />
                          <ItemDeleteDialog
                            itemId={item.id}
                            popupState={popupState}
                            onDeleteItem={onDeleteItem}
                          />
                          <MenuItem
                            {...bindMenu(popupState)}
                            onClick={() =>
                              this.handleVpnLookup(localItem, item, popupState)
                            }
                          >
                            VPN Lookup
                          </MenuItem>
                        </Menu>
                      </React.Fragment>
                    )}
                  </PopupState>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={11}>
                  <Grid container>
                    {this.renderTag(localItem.type, "Item Type: ")}
                    {this.renderTag(localItem.creative_story_name, "Story: ")}
                    {this.renderTag(localItem.shot_name, "Shot: ")}
                    {this.renderTag(localItem.department, "Department: ")}
                  </Grid>
                </Grid>
                <Grid item md={1}>
                  <IconButton
                    className={classnames(
                      classes.expand,
                      {
                        [classes.expandOpen]: this.state.expanded
                      },
                      classes.IconButton
                    )}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Collapse
          className={classes.collapse}
          in={this.state.expanded}
          timeout="auto"
          unmountOnExit
        >
          <Accordion
            index={index}
            localItem={localItem}
            item={item}
            onBlurInput={this.onBlurInput}
            onKeyPressItem={onKeyPressItem}
            onChange={this.handlerItemChange}
            cycles={cycles}
          />
        </Collapse>
      </Card>
    );
  }
}

CardCell.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CardCell);
