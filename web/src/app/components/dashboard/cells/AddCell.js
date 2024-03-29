import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import AddAccordion from "./AddAccordion";
import "react-image-lightbox/style.css";
import Dropzone from "react-dropzone";
import { uploadImageApi } from "../../../../api";
import NumberFormat from "react-number-format";

const styles = theme => ({
  card: {
    width: "100%"
  },
  cardContent: {
    width: "100%",
    margin: 0,
    padding: 0,
    maxHeight: 110
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
  select: {
    marginTop: 6,
    fontSize: "13px",
    "&::placeholder": {
      color: "grey"
    }
  },
  selectStock: {
    marginBottom: theme.spacing(1),
    width: "81px",
    marginTop: "17px",
    fontSize: "13px"
  },
  selectNGM: {
    marginBottom: theme.spacing(1),
    marginTop: "17px",
    fontSize: "13px"
  },
  tagLabel: {
    padding: 1,
    margin: 0,
    display: "inline"
  },
  tagField: {
    padding: "2px 4px",
    margin: 0,
    backgroundColor: "#E6E4E4",
    color: "#199EB9"
  },
  helperText: {
    color: "red"
  },
  inputFont: {
    fontSize: "13px"
  },
  labelFont: {
    fontSize: "13px"
  },
  cardCellCustom: {
    width: "100%",
    marginTop: "1%",
    marginBottom: "1%",
    paddingTop: "1%"
  },
  extPadding: {
    paddingLeft: "21px"
  }
});
function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};
class AddCell extends React.Component {
  state = { expanded: false, isOpen: false, key: 0 };

  onDrop = (files, item) => {
    const file = files[0];
    if (file.type.split("/")[0] === "image") {
      this.getImageContent(file, item);
      let extension = file.name.split(".")[1];
      item.imageExtension = extension;
    } else {
      alert("Invalid Format");
    }
  };

  getImageContent = (file, item) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = readerEvent => {
      let content = readerEvent.target.result;
      item.image = content;
    };
  };

  canSubmit = ({ charCode }) => {
    if (charCode === 13 || charCode === 10) {
      this.props.onSubmit();
      this.setState({
        key: Math.random()
      });
    }
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, item, onChange, cycles } = this.props;
    return (
      <Card
        onKeyPress={this.canSubmit}
        className={classes.cardCellCustom}
        key={this.state.key}
      >
        <FormHelperText className={classes.helperText}>
          (*) Fill in the fields and press enter to save
        </FormHelperText>
        <CardContent className={classes.cardContent}>
          <Grid container>
            <Grid item md={1}>
              <Dropzone onDrop={files => this.onDrop(files, item)}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <img
                        className={classes.img}
                        alt="complex"
                        src={
                          item.image !== null ? item.image : item.newItemImage
                        }
                      />
                    </div>
                  </section>
                )}
              </Dropzone>
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
                    value={item.nmg_priority}
                    onChange={e => onChange("nmg_priority", e.target.value)}
                    name="Priority"
                    displayEmpty
                  >
                    <MenuItem value={0} disabled>
                      <div style={{ color: "grey" }}> Priority</div>
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
                      className: classes.inputFont
                    }}
                    InputLabelProps={{
                      className: classes.labelFont
                    }}
                    id="department_number"
                    label="Dept #"
                    className={classes.textField}
                    margin="normal"
                    value={item.department_number}
                    onChange={e =>
                      onChange("department_number", e.target.value)
                    }
                    required
                    error={!item.department_number}
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
                    id="vpn"
                    label="VPN"
                    className={classes.textField}
                    margin="normal"
                    value={item.vpn}
                    onChange={e => onChange("vpn", e.target.value)}
                    required
                    error={!item.vpn}
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
                    id="style_group_number"
                    label="SG#"
                    className={classes.textField}
                    margin="normal"
                    value={item.style_group_number}
                    onChange={e =>
                      onChange("style_group_number", e.target.value)
                    }
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
                    id="brand"
                    label="Brand"
                    className={classes.textField}
                    margin="normal"
                    value={item.brand}
                    onChange={e => onChange("brand", e.target.value)}
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
                    id="color"
                    label="Color"
                    className={classes.textField}
                    margin="normal"
                    value={item.color}
                    onChange={e => onChange("color", e.target.value)}
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
                    id="size"
                    label="Size"
                    className={classes.textField}
                    margin="normal"
                    value={item.size}
                    onChange={e => onChange("size", e.target.value)}
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
                    id="description"
                    label="Item Description"
                    className={classes.textField}
                    margin="normal"
                    //multiline
                    //rows={2}
                    value={item.description}
                    onChange={e => onChange("description", e.target.value)}
                  />
                </Grid>
                <Grid item md={1}>
                  <Select
                    inputProps={{
                      className: classes.inputFont
                    }}
                    className={classes.selectStock}
                    value={item.in_stock_week}
                    onChange={e => onChange("in_stock_week", e.target.value)}
                    name="in_stock_week"
                    displayEmpty
                  >
                    <MenuItem value={""} disabled>
                      <div style={{ color: "grey" }}>In Stock</div>
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
                    id="retail_price"
                    label="Price"
                    className={classes.textField}
                    margin="normal"
                    value={item.retail_price}
                    onChange={e => onChange("retail_price", e.target.value)}
                  />
                </Grid>
                <Grid item md={1} />
              </Grid>
              <Grid container>
                <Grid item md={11}>
                  <Grid container>
                    {item.category.map((data, i) => (
                      <div key={i} className={classes.tagLabel}>
                        <p className={classes.tagField}>{data}</p>
                      </div>
                    ))}
                  </Grid>
                </Grid>
                <Grid item md={1}>
                  <IconButton
                    className={classnames(classes.expand, {
                      [classes.expandOpen]: this.state.expanded
                    })}
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
          <AddAccordion item={item} onChange={onChange} cycles={cycles} />
        </Collapse>
      </Card>
    );
  }
}

AddCell.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddCell);
