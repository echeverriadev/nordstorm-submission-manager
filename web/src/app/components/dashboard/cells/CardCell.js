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
import Button from '@material-ui/core/Button';
import Accordion from './Accordion';
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Dropzone from "react-dropzone";
import { uploadImageApi } from '../../../../api';
import NumberFormat from 'react-number-format';
import ItemLogModal from '../ItemLogModal';
import ItemDeleteDialog from '../ItemDeleteDialog';


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
    marginTop: '20px'
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
    width: "80%",
    marginTop: 32,
  },
  selectStock: {
    marginBottom: theme.spacing.unit,
    width:'81px',
    paddingBottom:'2px',
    fontSize: '13px'
  },
  selectNGM: {
    marginBottom: theme.spacing.unit,
    paddingBottom:'2px',
    fontSize: '13px'
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
  inputFont: {
    fontSize: '13px',
  },
  input: {
    '&::placeholder': {
      color: 'red',
      opacity: 0.75
    }
  },
  labelFont: {
    fontSize: '13px',
  },
  IconButton: {
    color: 'rgba(0, 0, 0, 0.9)',
  },
  cardCellCustom: {
    marginTop: "1%",
    marginBottom: "1%"
  },
  extPadding:{
    paddingLeft:"21px"

  },

});

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        if(values.value=="")
           values.value=null
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

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
      uploadImageApi(formData).then().then(res => {
        if(res.code === 200)
          this.props.onChange(this.props.index, "image", res.data.url);
        else{
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

  handleDuplicateItem = (id, popupState)  => {
    const { onDuplicateItem } = this.props;
    popupState.close();
    onDuplicateItem(id);
  }
  

  render() {
    
  
    const { classes, item, index, onChange, cycles, onDeleteItem, isChangingFilter} = this.props;
    return (
      <Card className={[classes.card, classes.cardCellCustom]}>
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
                    (
                    <img
                      className={classes.img}
                      alt="complex1"
                      src={item.image}
                      onClick={() => this.setState({ isOpen: true })}
                    />
                    // <MyModal/>
                    // <SimpleModal/>
                    )
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
              <Grid spacing={11} className={classes.row} container direction="row" alignContent='center' alignItems='center'>
                  <Grid item md={1} className={classes.extPadding}>
                    <Select
                      inputProps= {{
                        className: classes.inputFont
                      }}
                      className={classes.selectNGM}
                      value={item.nmg_priority}
                      onChange={(!isChangingFilter)? e => onChange(index, "nmg_priority", e.target.value) : ""}
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
                      InputProps={{
                        className: classes.inputFont,
                        classes: {input: classes.input }
                      }}
                      InputLabelProps= {{
                        className: classes.labelFont
                      }}
                      id={"department_number"+index}
                      placeholder="Dept #*"
                      className={classes.textField}
                      margin="normal"
                      value={item.department_number}
                      onChange={(!isChangingFilter)? e => onChange(index, "department_number", e.target.value) : ""}
                      required
                      error={!item.department_number}
                    />
                  </Grid>
                  <Grid item md={1}>
                    <TextField
                      InputProps={{
                        className: classes.inputFont,
                        classes: {input: classes.input }
                      }}
                      InputLabelProps= {{
                        className: classes.labelFont
                      }}
                      id={"vpn"+index}
                      placeholder="VPN*"
                      className={classes.textField}
                      margin="normal"
                      value={item.vpn}
                      onChange={(!isChangingFilter)? e => onChange(index, "vpn", e.target.value) : ""}
                      required
                      error={!item.vpn}
                    />
                  </Grid>
                  <Grid item md={1}>
                    <TextField
                      InputProps={{
                        className: classes.inputFont
                      }}
                      InputLabelProps= {{
                        className: classes.labelFont
                      }}
                      id={"style_group_number"+index}
                      placeholder="SG"
                      className={classes.textField}
                      color="primary"
                      margin="normal"
                      value={item.style_group_number}
                      onChange={(!isChangingFilter)? e => onChange(index, "style_group_number", e.target.value) : ""}
                    />
                  </Grid>
                  <Grid item md={1}>
                    <TextField
                      InputProps={{
                        className: classes.inputFont,
                        classes: {input: classes.input }
                      }}
                      InputLabelProps= {{
                        className: classes.labelFont,
                        
                      }}
                      id={"brand"+index}
                      placeholder="Brand*"
                      className={classes.textField}
                      margin="normal"
                      value={item.brand}
                      onChange={(!isChangingFilter)? e => onChange(index, "brand", e.target.value) : ""}
                      required
                      error={!item.brand}
                    />
                  </Grid>
                  <Grid item md={1}>
                    <TextField
                      InputProps={{
                        className: classes.inputFont
                      }}
                      InputLabelProps= {{
                        className: classes.labelFont
                      }}
                      id={"color"+index}
                      placeholder="Color"
                      className={classes.textField}
                      margin="normal"
                      value={item.color}
                      onChange={(!isChangingFilter)? e => onChange(index, "color", e.target.value) : ""}
                    />
                  </Grid>
                  <Grid item md={1}>
                    <TextField
                      InputProps={{
                        className: classes.inputFont
                      }}
                      InputLabelProps= {{
                        className: classes.labelFont
                      }}
                      id={"size"+index}
                      placeholder="Size"
                      className={classes.textField}
                      margin="normal"
                      value={item.size}
                      onChange={(!isChangingFilter)? e => onChange(index, "size", e.target.value) : ""}
                    />
                  </Grid>
                  <Grid item md={2}>
                    <TextField
                      InputProps={{
                        className: classes.inputFont
                      }}
                      InputLabelProps= {{
                        className: classes.labelFont
                      }}
                      id={"description"+index}
                      placeholder="Item Description"
                      className={classes.textField}
                      margin="normal"
                      //multiline
                      //rows={2}
                      value={item.description}
                      onChange={(!isChangingFilter)? e => onChange(index, "description", e.target.value) : ""}
                    />
                  </Grid>
                  <Grid item md={1}>
                    <Select
                        inputProps= {{
                          className: classes.inputFont
                        }}
                        className={classes.selectStock}
                        value={item.in_stock_week}
                        onChange={(!isChangingFilter)? e => onChange(index, "in_stock_week", e.target.value) : ""}
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
                        inputComponent: NumberFormatCustom,
                      }}
                      InputLabelProps= {{
                        className: classes.labelFont
                      }}
                      id={"retail_price"+index}
                      placeholder="Price"
                      className={classes.textField}
                      margin="normal"
                      value={item.retail_price}
                      onChange={e => onChange(index, "retail_price", e.target.value)}
                     
                    />
                  </Grid>
                  <Grid item md={1}>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                      {popupState => (
                        <React.Fragment>
                          <IconButton variant="contained" {...bindTrigger(popupState)}>
                            <MoreVertIcon className={classes.IconButton}/>
                          </IconButton>
                          <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={(e) => this.handleDuplicateItem(item.id, popupState)}>Duplicate</MenuItem>
                            <ItemLogModal itemId={item.id} itemLog={item}/>
                            <ItemDeleteDialog itemId={item.id} popupState={popupState} onDeleteItem={onDeleteItem} />
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
                    }, classes.IconButton)}
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