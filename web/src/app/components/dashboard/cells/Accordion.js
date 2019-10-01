import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
import classNames from 'classnames';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  root: {
    backgroundColor: "#f3f3f3",
    flexGrow: 1,
    width: '100%',
    overflowX: 'auto',
    padding: 0
  },
  column: {
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(1)
  },
  helperText: {
    textAlign: 'center',
    paddingLeft: theme.spacing(1),
    textDecoration: 'underline',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "95%"
  },
  select: {
    width: "85%",
    fontSize: "13px"
  },
  selectCountry: {
    width: "95%"
  },
  switch: {
    fontSize: 16,
    margin: 0,
    width: "95%",
    justifyContent: "space-between"
  },
  tagsList: {
    margin: "15px 0 0",
    padding: 0,
    width: "100%",
    textAlign: "left"
  },
  tagItemOn: {
    marginTop: theme.spacing(1),
    color: '#fff',
    fontWeight: 'bold',
    '&:hover, &:focus': {
        backgroundColor: "#74a8da!important",
    },
    backgroundColor: '#74a8da;!important'
  },
  tagAvatarOn: {
    color: '#fff',
    backgroundColor: '#4278a9'
  },
  labelItem: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tagItemOff: {
    marginTop: theme.spacing(1),
    color: '#fff',
    fontWeight: 'bold',
    '&:hover, &:focus': {
        backgroundColor: "#C5C5C5",
    },
    backgroundColor: '#C5C5C5'
  },
  tagAvatarOff: {
    color: '#fff',
    backgroundColor: '#757575'
  },
  labelSwitch: {
      fontWeight: "bold"
  },
  tagItem: {
      fontWeight: "bold"
  },
  tagWith: {
      width: '100%',
      justifyContent: 'space-between'
  },
  inputFont: {
    fontSize: '13px'
  },
  inputBold: {
    fontWeight: 'bold'
  },
  labelFont: {
    fontSize: '13px'
  },
  labelItemContainer: {
    marginTop: '6%'
  },
  gridContainer: {
    paddingBottom: '2%',
    paddingTop: '1%'
  },
  switchBase: {
    color: '#cccccc',
    '&$switchChecked': {
      '& + .MuiSwitch-track': {
        backgroundColor: '#9ab6cb',
      }
    },
  },
  switchChecked: {
    color: '#013656',
  },
  switchRoot: {
    color: '#9ab6cb',
  },
  track: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
    marginTop: -3,
  },
  selectAllIcon: {
    width: 'auto',
    height: 13,
    marginBottom: -2,
    marginRight: 1,
  },
  selectPadding: {
    padding: '6px  0 6px',
  }
});

function NumberFormatCustom(props) {
  const { inputRef, onChange, name, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
            name
          },
        });
      }}
      name={name}
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Accordion = (props) => {
  const { classes, localItem, item, onBlurInput, index, onChange, onKeyPressItem, cycles } = props;

  // Handlers chip change 
  let handlerChipChange = (name, value, localItem, item) =>  {
      let e = {
        target: {
          name, 
          value 
        }
      };
      console.log(e);
      onChange(e, localItem, item);
  };


  return (
    <CardContent className={classes.root}>
        <Grid container>
            <Grid item md={1}>
                <FormHelperText className={classes.helperText}>
                  <SelectAllIcon className={classes.selectAllIcon} />Drop new image to replace
                </FormHelperText>
            </Grid>
            <Grid item className={classes.column} md={9}>
            
                <Grid className={classes.gridContainer} container >
                    <Grid item md={3}>
                        <FormHelperText className={classes.selectLabel}>Cycles</FormHelperText>
                        <Select
                            inputProps= {{
                              className: classNames([classes.inputFont, classes.inputBold])
                            }}
                            className={classes.select}
                            name="_fk_cycle"
                            value={localItem._fk_cycle === null ? 0 : localItem._fk_cycle}
                            onChange={e => onChange(e, localItem, item)}
                        >
                            <MenuItem value={-1} disabled>
                                Cycles
                            </MenuItem>
                            {
                                cycles.map(option => (
                                    <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </Grid>
                    <Grid style={{marginTop: "4px"}} item md={3}>
                    {
                        (localItem._fk_cycle && localItem._fk_cycle != -1)?
                        <div>
                          <TextField
                              InputProps={{
                                className: classes.inputFont,
                                inputComponent: NumberFormatCustom,
                              }}
                              InputLabelProps= {{
                                className: classes.labelFont,
                                disableAnimation: true,
                                
                              }}
                              id={"asp"+index}
                              label="Ann. Sale Price"
                              margin="none"
                              name="sale_price"
                              value={localItem.sale_price}
                              onBlur={(e, index) => onBlurInput(e, index, item)}
                              onChange={e => onChange(e, localItem, item)}
                          />
                        </div>
                        :
                        <div></div>
                    }
                    </Grid>
                    
                </Grid>
                <Divider/>
                <Grid className={classes.gridContainer} container>
                    <Grid item md={3}>
                        <FormControlLabel
                            control={
                                <Switch
                                    name="available_in_canada"
                                    value={localItem.available_in_canada === 1 ? true : false}
                                    checked={localItem.available_in_canada === 1 ? true : false}
                                    color='default'
                                    onChange={e => onChange(e, localItem, item)}
                                    classes={{switchBase: classes.switchBase, checked: classes.switchChecked,
                                    root: classes.switchRoot}}
                                />
                            }
                            className={classes.switch}
                            classes={{label: classes.labelSwitch}}
                            label="Available in Canada"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item md={3}>
                    {
                        (localItem.available_in_canada && localItem.available_in_canada === 1)?
                            <div>
                              <TextField
                                  InputProps={{
                                    className: classes.inputFont,
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  InputLabelProps= {{
                                    className: classes.labelFont,
                                    disableAnimation: true,
                                  }}
                                  id={"canadaprice"+index}
                                  disabled={!(localItem.available_in_canada === 1)}
                                  label="Canada Price"
                                  margin="none"
                                  name="price_cad"
                                  value={localItem.price_cad}
                                  onBlur={(e, index) => onBlurInput(e, index, item)}
                                  onChange={e => onChange(e, localItem)}
                              />
                            </div>
                        :
                        <div></div>
                    }
                        
                    </Grid>
                    <Grid style={{marginLeft: "-4%"}} item md={3}>
                    {
                        (localItem.available_in_canada && localItem.available_in_canada === 1)?
                            <div>
                              <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="country-of-origin-placeholder" style={{fontSize:"13px"}}>Country of Origin</InputLabel>
                                <Select
                                    inputProps= {{
                                      className: classNames([classes.inputFont, classes.selectPadding]),
                                      id: 'country-of-origin-placeholder'
                                    }}
                                    className={classes.selectCountry}
                                    value={localItem.country_of_origin === null ? null : localItem.country_of_origin}
                                    onChange={e => onChange(e, localItem, item)}
                                    name="country_of_origin"
                                >
                                    <MenuItem value={""} disabled style={{color:"#656565"}}>None</MenuItem>
                                    <MenuItem value={"USA"}>USA</MenuItem>
                                    <MenuItem value={"USA and Imported Materials"}>USA and Imported Materials</MenuItem>
                                    <MenuItem value={"Imported of American Materials"}>Imported of American Materials</MenuItem>
                                    <MenuItem value={"Imported - Specify Country"}>Imported - Specify Country</MenuItem>
                                </Select>
                              </FormControl>
                            </div>
                        :
                            <div></div>
                        
                    }
                    </Grid>
                    <Grid style={{marginLeft: "3%"}} item md={3}>
                        {
                            (localItem.country_of_origin === "Imported - Specify Country") ?
                               (localItem.available_in_canada && localItem.available_in_canada === 1)?
                                    <div>
                                      <TextField
                                          InputProps={{
                                            className: classes.inputFont
                                          }}
                                          InputLabelProps= {{
                                            className: classes.labelFont,
                                            disableAnimation: true,
                                          }}
                                          id={"specifycountry"+index}
                                          label="Specify Country"
                                          margin="none"
                                          value={localItem.country_of_origin_other}
                                          name="country_of_origin_other"
                                          onBlur={(e, index) => onBlurInput(e, index, item)}
                                          onChange={e => onChange(e, localItem, item)}
                                      />
                                    </div>
                                :
                                    <div></div>
                                    
                            :
                            null
                        }
                    </Grid>
                </Grid>
              <Divider/>
                <Grid className={classes.gridContainer} container>
                    <Grid item md={3}>
                        <FormControlLabel
                            control={
                                <Switch
                                    value={localItem.request_extension === 1 ? true : false}
                                    checked={localItem.request_extension === 1 ? true : false}
                                    color='default'
                                    name="request_extension"
                                    onChange={e => onChange(e, localItem, item)}
                                    classes={{switchBase: classes.switchBase, checked: classes.switchChecked,
                                    root: classes.switchRoot}}
                                />
                            }
                            className={classes.switch}
                            classes={{label: classes.labelSwitch}}
                            label="Request Extension"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item md={3}>
                        {
                            (localItem.request_extension === 1)?
                                <div>
                                  <TextField
                                      InputProps={{
                                        className: classes.inputFont
                                      }}
                                      InputLabelProps= {{
                                        className: classes.labelFont,
                                        disableAnimation: true,
                                      }}
                                      id={"extensionreason"+index}
                                      disabled={!(localItem.request_extension === 1)}
                                      label="Extension Reason"
                                      margin="none"
                                      value={localItem.request_extension_note}
                                      name="request_extension_note"
                                      onBlur={(e, index) => onBlurInput(e, index, item)}
                                      onChange={e => onChange(e, localItem, item)}
                                  />
                                </div>
                            :
                                <div></div>
                            
                        }
                    </Grid>
                </Grid>
              <Divider/>
                <Grid container>
                    <Grid item md={3}>
                        <FormControlLabel
                            control={
                                <Switch
                                    value={localItem.request_cancellation === 1 ? true : false}
                                    checked={localItem.request_cancellation === 1 ? true : false}
                                    color='default'
                                    name="request_cancellation"
                                    onChange={e => onChange(e, localItem, item)}
                                    classes={{switchBase: classes.switchBase, checked: classes.switchChecked,
                                    root: classes.switchRoot}}
                                />
                            }
                            className={classes.switch}
                            classes={{label: classes.labelSwitch}}
                            label="Request Cancelation"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item md={3}>
                     {
                        (localItem.request_cancellation === 1)?
                            <div>
                              <TextField
                                  InputProps={{
                                    className: classes.inputFont,
                                  }}
                                  InputLabelProps= {{
                                    className: classes.labelFont,
                                    disableAnimation: true,
                                  }}
                                  id={"cancelationreason"+index}
                                  disabled={!(localItem.request_cancellation === 1)}
                                  label="Cancelation Reason"
                                  margin="none"
                                  value={localItem.request_cancellation_notes}
                                  name="request_cancellation_notes"
                                  onBlur={(e, index) => onBlurInput(e, index, item)}
                                  onChange={e => onChange(e, localItem, item)}
                              />
                            </div>
                        :
                            <div></div>
                     }
                    </Grid>
                </Grid>
            </Grid>
            <Grid item className={classes.column} md={2}>
                <Grid container direction="column">
                    <Grid item md>
                        <Typography variant="caption">Department name</Typography>
                        <Typography variant="body1"><b>{localItem.department}</b></Typography>
                    </Grid>
                    <Grid className={classes.tagsList} item md={9}>
                    <Typography className={classes.tagItem} variant="caption">Tags</Typography>
                        {
                            localItem.tagged_missy === 1 ?
                                <Chip
                                    avatar={<Avatar className={classes.tagAvatarOn} name="tagged_missy">M</Avatar>}
                                    label="Missy"
                                    name="tagged_missy" 
                                    className={classNames(classes.tagItemOn,classes.tagWith, "tagged-missy")}
                                    deleteIcon={<DoneIcon style={{color:'#fff'}} />}
                                    onDelete={() => handlerChipChange("tagged_missy", 0, localItem, item)}
                                    onClick={() => handlerChipChange("tagged_missy", 0, localItem, item)}
                                />
                            :
                                <Chip
                                    avatar={<Avatar className={classes.tagAvatarOff} name="tagged_missy">M</Avatar>}
                                    label="Missy"
                                    name="tagged_missy"
                                    className={classNames(classes.tagItemOff,classes.tagWith)}
                                    onDelete={() => handlerChipChange("tagged_missy", 1, localItem, item)}
                                    onClick={() => handlerChipChange("tagged_missy", 1, localItem, item)}
                                    deleteIcon={<div style={{width:'24px'}} />}
                                />
                        }
                        {
                            localItem.tagged_encore === 1 ?
                                <Chip
                                    avatar={<Avatar className={classes.tagAvatarOn}>E</Avatar>}
                                    label="Encore"
                                    clickable
                                    className={classNames(classes.tagItemOn,classes.tagWith)}
                                    name="tagged_encore"
                                    deleteIcon={<DoneIcon style={{color:'#fff'}} />}
                                    onDelete={() => handlerChipChange("tagged_encore", 0, localItem, item)}
                                    onClick={() => handlerChipChange("tagged_encore", 0, localItem, item)}
                                />
                            :
                                <Chip
                                    avatar={<Avatar className={classes.tagAvatarOff}>E</Avatar>}
                                    label="Encore"
                                    name="tagged_encore"
                                    className={classNames(classes.tagItemOff,classes.tagWith)}
                                    onDelete={() => handlerChipChange("tagged_encore", 1, localItem, item)}
                                    onClick={() => handlerChipChange("tagged_encore", 1, localItem, item)}
                                    deleteIcon={<div style={{width:'24px'}} />}
                                />
                        }
                        {
                            localItem.tagged_petite === 1 ?
                                <Chip
                                    avatar={<Avatar className={classes.tagAvatarOn}>P</Avatar>}
                                    label="Petite"
                                    clickable
                                    className={classNames(classes.tagItemOn,classes.tagWith)}
                                    deleteIcon={<DoneIcon style={{color:'#fff'}} />}
                                    name="tagged_petite"
                                    onDelete={() => handlerChipChange("tagged_petite", 0, localItem, item)}
                                    onClick={() => handlerChipChange("tagged_petite", 0, localItem, item)}
                                />
                            :
                                <Chip
                                    avatar={<Avatar className={classes.tagAvatarOff}>P</Avatar>}
                                    label="Petite"
                                    name="tagged_petite"
                                    className={classNames(classes.tagItemOff,classes.tagWith)}
                                    onDelete={() => handlerChipChange("tagged_petite", 1, localItem, item)}
                                    onClick={() => handlerChipChange("tagged_petite", 1, localItem, item)}
                                    deleteIcon={<div style={{width:'24px'}} />}
                                />
                        }
                        {
                            localItem.tagged_extended === 1 ?
                                <Chip
                                    avatar={<Avatar className={classes.tagAvatarOn}>E</Avatar>}
                                    label="Extended"
                                    clickable
                                    className={classNames(classes.tagItemOn,classes.tagWith)}
                                    deleteIcon={<DoneIcon style={{color:'#fff'}} />}
                                    name="tagged_extended"
                                    onDelete={() => handlerChipChange("tagged_extended", 0, localItem, item)}
                                    onClick={() => handlerChipChange("tagged_extended", 0, localItem, item)}
                                />
                            :
                                <Chip
                                    avatar={<Avatar className={classes.tagAvatarOff}>X</Avatar>}
                                    label="Extended"
                                    className={classNames(classes.tagItemOff,classes.tagWith)}
                                    name="tagged_extended"
                                    onDelete={() => handlerChipChange("tagged_extended", 1, localItem, item)}
                                    onClick={() => handlerChipChange("tagged_extended", 1, localItem, item)}
                                    deleteIcon={<div style={{width:'24px'}} />}
                                />
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </CardContent>
  );
}

Accordion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Accordion);