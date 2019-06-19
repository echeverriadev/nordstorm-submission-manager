import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    backgroundColor: "#f3f3f3",
    flexGrow: 1,
    width: '100%',
    overflowX: 'auto',
    padding: 0
  },
  column: {
      paddingTop: theme.spacing.unit,
      paddingLeft: theme.spacing.unit
  },
  helperText: {
    textAlign: 'center',
    paddingLeft: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "95%"
  },
  select: {
    width: "95%",
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
    marginTop: theme.spacing.unit,
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
    marginTop: theme.spacing.unit,
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
  const { classes, item, index, onChange, cycles } = props;

  return (
    <CardContent className={classes.root}>
        <Grid container>
            <Grid item md={1}>
                <FormHelperText className={classes.helperText}>Drop the image to replace</FormHelperText>
            </Grid>
            <Grid item className={classes.column} md={9}>
            
                <Grid className={classes.gridContainer} container >
                    <Grid item md={3}>
                        <FormHelperText className={classes.selectLabel}>Cycles</FormHelperText>
                        <Select
                            inputProps= {{
                              className: classes.inputFont
                            }}
                            className={classes.select}
                            name="Cycles"
                            value={item._fk_cycle}
                            onChange={e => onChange(index, "_fk_cycle", e.target.value)}
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
                          <FormHelperText className={classes.selectLabel}>Ann. Sale Price</FormHelperText>
                          <TextField
                              InputProps={{
                                className: classes.inputFont,
                                inputComponent: NumberFormatCustom,
                                disableAnimation: true,
                              }}
                              InputLabelProps= {{
                                className: classes.labelFont
                                
                              }}
                              id={"asp"+index}
                              placeholder="Input text"
                              margin="none"
                              value={item.sale_price}
                              onChange={e => onChange(index, "sale_price", e.target.value)}
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
                              <FormHelperText className={classes.selectLabel}>Product Priority</FormHelperText>
                              <TextField
                                  InputProps={{
                                    className: classes.inputFont,
                                    disableAnimation: true,
                                  }}
                                  InputLabelProps= {{
                                    className: classes.labelFont
                                  }}
                                  id={"pp"+index}
                                  placeholder="Input Text"
                                  margin="none"
                                  value={item.is_priority}
                                  onChange={e => onChange(index, "is_priority", e.target.value)}
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
                                    onChange={e => onChange(index, "available_in_canada", e.target.checked ? 1 : 0)}
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
                              <FormHelperText className={classes.selectLabel}>Canada Price</FormHelperText>
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
                                  disabled={!(item.available_in_canada === 1)}
                                  placeholder="Input text"
                                  margin="none"
                                  defaultValue={(item.price_cad && item.price_cad != "")? item.price_cad : 0}
                                  onChange={e => onChange(index, "price_cad", e.target.value)}
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
                              <FormHelperText className={classes.selectLabel}>Country of Origin</FormHelperText>
                              <Select
                                  inputProps= {{
                                    className: classes.inputFont,
                                    disableAnimation: true,
                                  }}
                                  className={classes.selectCountry}
                                  value={item.country_of_origin}
                                  onChange={e => onChange(index, "country_of_origin", e.target.value)}
                                  name="Country of origin"
                                  displayEmpty
                              >
                                  <MenuItem value={""} disabled>
                                      Input text
                                  </MenuItem>
                                  <MenuItem value={"USA"}>USA</MenuItem>
                                  <MenuItem value={"USA and Imported Materials"}>USA and Imported Materials</MenuItem>
                                  <MenuItem value={"Imported of American Materials"}>Imported of American Materials</MenuItem>
                                  <MenuItem value={"Imported - Specify Country"}>Imported - Specify Country</MenuItem>
                              </Select>
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
                                      <FormHelperText className={classes.selectLabel}>Specify Country</FormHelperText>
                                      <TextField
                                          InputProps={{
                                            className: classes.inputFont
                                          }}
                                          InputLabelProps= {{
                                            className: classes.labelFont
                                          }}
                                          id={"specifycountry"+index}
                                          placeholder="Input text"
                                          margin="none"
                                          value={item.country_of_origin_other}
                                          onChange={e => onChange(index, "country_of_origin_other", e.target.value)}
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
                                    onChange={e => onChange(index, "request_extension", e.target.checked ? 1 : 0)}
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
                                  <FormHelperText className={classes.selectLabel}>Extension Reason</FormHelperText>
                                  <TextField
                                      InputProps={{
                                        className: classes.inputFont
                                      }}
                                      InputLabelProps= {{
                                        className: classes.labelFont,
                                        disableAnimation: true,
                                      }}
                                      id={"extensionreason"+index}
                                      disabled={!(item.request_extension === 1)}
                                      placeholder="Input text"
                                      margin="none"
                                      value={item.request_extension_note}
                                      onChange={e => onChange(index, "request_extension_note", e.target.value)}
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
                                    onChange={e => onChange(index, "request_cancellation", e.target.checked ? 1 : 0)}
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
                              <FormHelperText className={classes.selectLabel}>Cancelation Reason</FormHelperText>
                              <TextField
                                  InputProps={{
                                    className: classes.inputFont,
                                    disableAnimation: true,
                                  }}
                                  InputLabelProps= {{
                                    className: classes.labelFont
                                  }}
                                  id={"cancelationreason"+index}
                                  disabled={!(item.request_cancellation === 1)}
                                  placeholder="Input text"
                                  margin="none"
                                  value={item.request_cancellation_notes}
                                  onChange={e => onChange(index, "request_cancellation_notes", e.target.value)}
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
                                    onDelete={() => onChange(index, "tagged_missy", 0)}
                                    onClick={() => onChange(index, "tagged_missy", 0)}
                                />
                            :
                                <Chip
                                    avatar={<Avatar className={classes.tagAvatarOff}>M</Avatar>}
                                    label="Missy"
                                    
                                    className={classNames(classes.tagItemOff,classes.tagWith)}
                                    onDelete={() => onChange(index, "tagged_missy", 1)}
                                    onClick={() => onChange(index, "tagged_missy", 1)}
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
                                    onDelete={() => onChange(index, "tagged_encore", 0)}
                                    onClick={() => onChange(index, "tagged_encore", 0)}
                                />
                            :
                                <Chip
                                    avatar={<Avatar className={classes.tagAvatarOff}>E</Avatar>}
                                    label="Encore"
                                    className={classNames(classes.tagItemOff,classes.tagWith)}
                                    onDelete={() => onChange(index, "tagged_encore", 1)}
                                    onClick={() => onChange(index, "tagged_encore", 1)}
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
                                    onDelete={() => onChange(index, "tagged_petite", 0)}
                                    onClick={() => onChange(index, "tagged_petite", 0)}
                                />
                            :
                                <Chip
                                    avatar={<Avatar className={classes.tagAvatarOff}>P</Avatar>}
                                    label="Petite"
                                    className={classNames(classes.tagItemOff,classes.tagWith)}
                                    onDelete={() => onChange(index, "tagged_petite", 1)}
                                    onClick={() => onChange(index, "tagged_petite", 1)}
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
                                    onDelete={() => onChange(index, "tagged_extended", 0)}
                                    onClick={() => onChange(index, "tagged_extended", 0)}
                                />
                            :
                                <Chip
                                    avatar={<Avatar className={classes.tagAvatarOff}>X</Avatar>}
                                    label="Extended"
                                    className={classNames(classes.tagItemOff,classes.tagWith)}
                                    onDelete={() => onChange(index, "tagged_extended", 1)}
                                    onClick={() => onChange(index, "tagged_extended", 1)}
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