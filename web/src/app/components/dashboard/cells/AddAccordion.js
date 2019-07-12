import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
import classNames from 'classnames';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';
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
        backgroundColor: "#74a8da",
    },
    backgroundColor: '#74a8da'
  },
  tagAvatarOn: {
    color: '#fff',
    backgroundColor: '#4278a9'
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
  labelItem: {
    fontWeight: 'bold',
    fontSize: 16
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

const Accordion = (props) => {
  const { classes, item, onChange, cycles } = props;

  return (
    <CardContent className={classes.root}>
        <Grid container>
            <Grid item md={1}>
                <FormHelperText className={classes.helperText}>
                  <SelectAllIcon className={classes.selectAllIcon} />Drop new image to replace
                </FormHelperText>
            </Grid>
            <Grid item className={classes.column} md={9}>
                <Grid className={classes.gridContainer} container>
                    <Grid item md={3}>
                        <FormHelperText className={classes.selectLabel}>Cycles</FormHelperText>
                        <Select
                            inputProps= {{
                              className: classNames([classes.inputFont, classes.inputBold])
                            }}
                            className={classes.select}
                            name="Cycles"
                            value={item._fk_cycle === null ? 0 : item._fk_cycle}
                            onChange={e => onChange("_fk_cycle", e.target.value)}
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
                        (item._fk_cycle && item._fk_cycle != -1)?
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
                              label="Ann. Sale Price"
                              margin="none"
                              value={item.sale_price}
                              onChange={e => onChange("sale_price", e.target.value)}
                          />
                        </div>
                        :
                        <div></div>
                    }
                    </Grid>
                    <Grid style={{marginTop: "4px", marginLeft: "-4%"}} item md={3}>
                    {
                        (item._fk_cycle && item._fk_cycle != -1)?
                            <div>
                              <TextField
                                InputProps={{
                                  className: classes.inputFont,
                                }}
                                InputLabelProps= {{
                                  className: classes.labelFont,
                                  disableAnimation: true,
                                }}
                                label="Product Priority"
                                margin="none"
                                value={item.is_priority === null ? "" : item.is_priority}
                                onChange={e => onChange("is_priority", e.target.value)}
                                type="number"
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
                                    value={item.available_in_canada === 1 ? true : false}
                                    checked={item.available_in_canada === 1 ? true : false}
                                    color='default'
                                    onChange={e => onChange("available_in_canada", e.target.checked ? 1 : 0)}
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
                        (item.available_in_canada && item.available_in_canada === 1)?
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
                                  disabled={!(item.available_in_canada === 1)}
                                  label="Canada Price"
                                  margin="none"
                                  value={item.price_cad}
                                  onChange={e => onChange("price_cad", e.target.value)}
                              />
                            </div>
                        :
                            <div></div>
                    }
                        
                    </Grid>
                    <Grid style={{marginLeft: "-4%"}} item md={3}>
                    {
                        (item.available_in_canada && item.available_in_canada === 1)?
                            <div>
                              <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="country-of-origin-placeholder" style={{fontSize:"13px"}}>Country of Origin</InputLabel>
                                <Select
                                    inputProps= {{
                                      className: classes.inputFont,
                                      id: 'country-of-origin-placeholder'
                                    }}
                                    className={classes.selectCountry}
                                    value={item.country_of_origin === null ? 0 : item.country_of_origin}
                                    onChange={e => onChange("country_of_origin", e.target.value)}
                                    name="Country of origin"
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
                    <Grid style={{marginTop: "3px", marginLeft: "3%"}} item md={3}>
                        {
                            (item.country_of_origin === "Imported - Specify Country") ?
                               (item.available_in_canada && item.available_in_canada === 1)?
                                    <div>
                                      <TextField
                                          InputProps={{
                                            className: classes.inputFont
                                          }}
                                          InputLabelProps= {{
                                            className: classes.labelFont
                                          }}
                                          label="Specify Country"
                                          margin="none"
                                          value={item.country_of_origin_other}
                                          onChange={e => onChange( "country_of_origin_other", e.target.value)}
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
                                    value={item.request_extension === 1 ? true : false}
                                    checked={item.request_extension === 1 ? true : false}
                                    color='default'
                                    onChange={e => onChange("request_extension", e.target.checked ? 1 : 0)}
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
                            (item.request_extension === 1)?
                                <div>
                                  <TextField
                                      InputProps={{
                                        className: classes.inputFont,
                                      }}
                                      InputLabelProps= {{
                                        className: classes.labelFont,
                                        disableAnimation: true,
                                      }}
                                      disabled={!(item.request_extension === 1)}
                                      label="Extension Reason"
                                      margin="none"
                                      value={item.request_extension_note}
                                      onChange={e => onChange("request_extension_note", e.target.value)}
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
                                    value={item.request_cancellation === 1 ? true : false}
                                    checked={item.request_cancellation === 1 ? true : false}
                                    color='default'
                                    onChange={e => onChange("request_cancellation", e.target.checked ? 1 : 0)}
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
                        (item.request_cancellation === 1)?
                            <div>
                              <TextField
                                  InputProps={{
                                    className: classes.inputFont,
                                  }}
                                  InputLabelProps= {{
                                    className: classes.labelFont,
                                    disableAnimation: true,
                                  }}
                                  disabled={!(item.request_cancellation === 1)}
                                  label="Cancelation Reason"
                                  margin="none"
                                  value={item.request_cancellation_notes}
                                  onChange={e => onChange("request_cancellation_notes", e.target.value)}
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
                        <Typography variant="body1"><b>{item.department}</b></Typography>
                    </Grid>
                    <Grid className={classes.tagsList} item md={9}>
                    <Typography className={classes.tagItem} variant="caption">Tags</Typography>
                        {
                            item.tagged_missy === 1 ?
                                <Chip
                                    avatar={<Avatar className={classes.tagAvatarOn}>M</Avatar>}
                                    label="Missy"
                                    
                                    className={classNames(classes.tagItemOn,classes.tagWith)}
                                    deleteIcon={<DoneIcon style={{color:'#fff'}} />}
                                    onDelete={() => onChange("tagged_missy", 0)}
                                    onClick={() => onChange("tagged_missy", 0)}
                                />
                            :
                                <Chip
                                    avatar={<Avatar className={classes.tagAvatarOff}>M</Avatar>}
                                    label="Missy"
                                    className={classNames(classes.tagItemOff,classes.tagWith)}
                                    onDelete={() => onChange("tagged_missy", 1)}
                                    onClick={() => onChange("tagged_missy", 1)}
                                    deleteIcon={<div style={{width:'24px'}} />}
                                />
                        }
                        {
                            item.tagged_encore === 1 ?
                                <Chip
                                    avatar={<Avatar className={classes.tagAvatarOn}>E</Avatar>}
                                    label="Encore"
                                    clickable
                                    className={classNames(classes.tagItemOn,classes.tagWith)}
                                    deleteIcon={<DoneIcon style={{color:'#fff'}} />}
                                    onDelete={() => onChange("tagged_encore", 0)}
                                    onClick={() => onChange("tagged_encore", 0)}
                                />
                            :
                                <Chip
                                    avatar={<Avatar className={classes.tagAvatarOff}>E</Avatar>}
                                    label="Encore"
                                    clickable
                                    className={classNames(classes.tagItemOff,classes.tagWith)}
                                    onDelete={() => onChange("tagged_encore", 1)}
                                    onClick={() => onChange("tagged_encore", 1)}
                                    deleteIcon={<div style={{width:'24px'}} />}
                                />
                        }
                        {
                            item.tagged_petite === 1 ?
                                <Chip
                                    avatar={<Avatar className={classes.tagAvatarOn}>P</Avatar>}
                                    label="Petite"
                                    clickable
                                    className={classNames(classes.tagItemOn,classes.tagWith)}
                                    deleteIcon={<DoneIcon style={{color:'#fff'}} />}
                                    onDelete={() => onChange("tagged_petite", 0)}
                                    onClick={() => onChange("tagged_petite", 0)}
                                />
                            :
                                <Chip
                                    avatar={<Avatar className={classes.tagAvatarOff}>P</Avatar>}
                                    label="Petite"
                                    clickable
                                    className={classNames(classes.tagItemOff,classes.tagWith)}
                                    onDelete={() => onChange("tagged_petite", 1)}
                                    onClick={() => onChange("tagged_petite", 1)}
                                    deleteIcon={<div style={{width:'24px'}} />}
                                />
                        }
                        {
                            item.tagged_extended === 1 ?
                                <Chip
                                    avatar={<Avatar className={classes.tagAvatarOn}>E</Avatar>}
                                    label="Extended"
                                    clickable
                                    className={classNames(classes.tagItemOn,classes.tagWith)}
                                    deleteIcon={<DoneIcon style={{color:'#fff'}} />}
                                    onDelete={() => onChange("tagged_extended", 0)}
                                    onClick={() => onChange("tagged_extended", 0)}
                                />
                            :
                                <Chip
                                    avatar={<Avatar className={classes.tagAvatarOff}>X</Avatar>}
                                    label="Extended"
                                    clickable
                                    className={classNames(classes.tagItemOff,classes.tagWith)}
                                    onDelete={() => onChange("tagged_extended", 1)}
                                    onClick={() => onChange("tagged_extended", 1)}
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