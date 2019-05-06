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
import Accordion from './Accordion';
import Lightbox from "react-image-lightbox";
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
});

class CardCell extends React.Component {
  state = { expanded: false, isOpen: false, preview: null };

  duplicate = (close) => {
    alert("Hola Mundo");
    close();
  }

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
          this.props.onChange(this.props.index, "image", res.data.url);
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
    const { classes, item, index, onChange, cycles } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>

          <Grid container>
            <Grid item md={1}>
                {
                  !this.state.expanded ?

                  this.state.isOpen ? (
                      <Lightbox
                        mainSrc={item.image}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                      />
                    )
                    :
                    (<img
                      className={classes.img}
                      alt="complex"
                      src={item.image}
                      onClick={() => this.setState({ isOpen: true })}
                    />)
                  :
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
                            src={this.state.preview ? this.state.preview : item.image}
                          />
                        </div>
                      </section>
                    )}

                  </Dropzone>
                }


            </Grid>
            <Grid item md={11}>
              <Grid className={classes.row} container direction="row" alignContent='center' alignItems='center'>
                  <Grid item md={1}>
                    <Select
                      className={classes.select}
                      value={item.is_priority}
                      onChange={e => onChange(index, "is_priority", e.target.value)}
                      name="Priority"
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
                      id="department_number"
                      label="Dept #"
                      className={classes.textField}
                      margin="normal"
                      value={item.department_number}
                      onChange={e => onChange(index, "department_number", e.target.value)}
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
                      onChange={e => onChange(index, "vpn", e.target.value)}
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
                      onChange={e => onChange(index, "style_group_number", e.target.value)}
                    />
                  </Grid>
                  <Grid item md={1}>
                    <TextField
                      id="brand"
                      label="Brand"
                      className={classes.textField}
                      margin="normal"
                      value={item.brand}
                      onChange={e => onChange(index, "brand", e.target.value)}
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
                      onChange={e => onChange(index, "color", e.target.value)}
                    />
                  </Grid>
                  <Grid item md={1}>
                    <TextField
                      id="size"
                      label="Size"
                      className={classes.textField}
                      margin="normal"
                      value={item.size}
                      onChange={e => onChange(index, "size", e.target.value)}
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
                      onChange={e => onChange(index, "description", e.target.value)}
                    />
                  </Grid>
                  <Grid item md={1}>
                    <Select
                        className={classes.select}
                        value={item.in_stock_week}
                        onChange={e => onChange(index, "in_stock_week", e.target.value)}
                        name="in_stock_week"
                        displayEmpty
                      >
                        <MenuItem value={""} disabled>
                            In Stock Week
                          </MenuItem>
                          <MenuItem value={0}>0</MenuItem>
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                          <MenuItem value={6}>6</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item md={1}>
                    <TextField
                      id="price"
                      label="Price"
                      className={classes.textField}
                      margin="normal"
                      value={item.price}
                      onChange={e => onChange(index, "price", e.target.value)}
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
          <Accordion index={index} item={item} onChange={onChange} cycles={cycles}/>
        </Collapse>
      </Card>
    );
  }
}

CardCell.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardCell);