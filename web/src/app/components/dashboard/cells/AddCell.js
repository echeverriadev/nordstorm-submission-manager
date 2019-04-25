import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state/index';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import AddAccordion from './AddAccordion';
import "react-image-lightbox/style.css";
import Dropzone from "react-dropzone";

const styles = theme => ({
  card: {
    width: "100%"
  },
  cardContent: {
    width: "100%",
    margin: 0,
    padding: 0,
    maxHeight: 110,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: theme.spacing.unit * 12,
    Maxheight: theme.spacing.unit * 13,
  },
  row: {
    maxHeight: "50%",
  },
  botton: {
    padding: 0,
    margin: 0
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 4,
    width: "95%",
  },
  select: {
    marginBottom: theme.spacing.unit,
  },
  tagLabel: {
    padding: 1,
    margin: 0,
    display: 'inline',
  },
  tagField: {
    padding: "2px 4px",
    margin: 0,
    backgroundColor: "#E6E4E4",
    color: "#199EB9",
  },
  helperText: {
      color: 'red'
  }
});

class AddCell extends React.Component {
  state = { expanded: false, isOpen: false, preview: null };

  onDrop = (files) => {
    const file = files[0]
    if(file.type.split('/')[0]==="image"){
      const formData = new FormData();

      formData.append('file', file);

      this.setState({preview: URL.createObjectURL(files[0])});

      fetch(`${process.env.REACT_APP_API_URL}/items/upload`, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(res => {
        if(res.code === 200){
          this.props.onChange("image", res.data.url);
        }else{
          console.error(res)
            alert(res.message || 'oops a problem has occurred')
        }
      })
    }else{
      alert('Invalid Format');
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, item, onChange, onSubmit } = this.props;

    return (
      <Card onKeyPress={e => onSubmit(e.key)} className={classes.card}>
          <FormHelperText className={classes.helperText}>(*) Fill in the fields and press enter to save</FormHelperText>
          <CardContent className={classes.cardContent}>

            <Grid container>
              <Grid item md={1}>
                    <Dropzone
                      onDrop={this.onDrop}
                    >
                      {({getRootProps, getInputProps}) => (
                        <section>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                                  <img
                                      className={classes.img}
                                      alt="complex"
                                      src={this.state.preview ? this.state.preview : item.image || "https://cdn2.iconfinder.com/data/icons/picons-basic-3/57/basic3-083_dashed_box_drop_zone-512.png"}
                                  />

                          </div>
                        </section>
                      )}
                    </Dropzone>
              </Grid>
              <Grid item md={11}>
                <Grid className={classes.row} container direction="row" alignContent='center' alignItems='center'>
                    <Grid item md={1}>
                      <Select
                        className={classes.select}
                        value={item.is_priority}
                        onChange={e => onChange("is_priority", e.target.value)}
                        name="Priority"
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          Priority
                        </MenuItem>
                        <MenuItem value={0}>Demo 0</MenuItem>
                        <MenuItem value={1}>Demo 1</MenuItem>
                        <MenuItem value={2}>Demo 2</MenuItem>
                        <MenuItem value={3}>Demo 3</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item md={1}>
                      <TextField
                        id="department_number"
                        label="Dept #"
                        className={classes.textField}
                        margin="normal"
                        value={item.department_number}
                        onChange={e => onChange("department_number", e.target.value)}
                        required
                        error={!item.department_number}
                      />
                    </Grid>
                    <Grid item md={1}>
                      <TextField
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
                        id="style_group_number"
                        label="SG"
                        className={classes.textField}
                        margin="normal"
                        value={item.style_group_number}
                        onChange={e => onChange("style_group_number", e.target.value)}
                      />
                    </Grid>
                    <Grid item md={1}>
                      <TextField
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
                          className={classes.select}
                          value={item.in_stock_week}
                          onChange={e => onChange("in_stock_week", e.target.value)}
                          name="in_stock_week"
                          displayEmpty
                        >
                          <MenuItem value="" disabled>
                            in Stock Week
                          </MenuItem>
                          <MenuItem value={1}>Demo 1</MenuItem>
                          <MenuItem value={2}>Demo 2</MenuItem>
                          <MenuItem value={3}>Demo 3</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item md={1}>
                      <TextField
                        id="price"
                        label="Price"
                        className={classes.textField}
                        margin="normal"
                        value={item.price}
                        onChange={e => onChange("price", e.target.value)}
                      />
                    </Grid>
                    <Grid item md={1}>
                      <PopupState variant="popover" popupId="demo-popup-menu">
                        {popupState => (
                          <React.Fragment>
                            <IconButton variant="contained" {...bindTrigger(popupState)}>
                              <MoreVertIcon />
                            </IconButton>
                            <Menu {...bindMenu(popupState)}>
                              <MenuItem onClick={popupState.close}>Duplicate</MenuItem>
                              <MenuItem onClick={popupState.close}>Delete</MenuItem>
                            </Menu>
                          </React.Fragment>
                        )}
                      </PopupState>

                    </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={11}>
                    <Grid container >
                      {
                        item.category.map((data, i) => (
                            <div key={i} className={classes.tagLabel}>
                              <p className={classes.tagField}>
                                {data}
                              </p>
                            </div>
                        ))
                      }
                    </Grid>
                  </Grid>
                  <Grid item md={1}>
                    <IconButton
                      className={classnames(classes.expand, {
                        [classes.expandOpen]: this.state.expanded,
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
          <Collapse className={classes.collapse} in={this.state.expanded} timeout="auto" unmountOnExit>
            <AddAccordion item={item} onChange={onChange}/>
          </Collapse>
      </Card>
    );
  }
}

AddCell.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddCell);