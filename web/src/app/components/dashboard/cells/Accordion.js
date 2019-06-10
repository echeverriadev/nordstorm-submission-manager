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
    paddingTop: 16,
    width: "95%"
  },
  switch: {
    fontSize: 18,
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
    fontWeight: 'bold'
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
                        <TextField
                            InputProps={{
                              className: classes.inputFont,
                              inputComponent: NumberFormatCustom
                            }}
                            InputLabelProps= {{
                              className: classes.labelFont
                              
                            }}
                            id={"asp"+index}
                            label="Ann. Sale Price"
                            margin="none"
                            value={item.sale_price}
                            onChange={e => onChange(index, "sale_price", e.target.value)}
                        />
                        :
                        <div className={classes.labelItemContainer}>
                            <InputLabel
                             className={classes.labelItem}
                             htmlFor="sale_price">
                            Ann. Sale Price: {item.sale_price}
                            </InputLabel>
                        </div>
                    }
                    </Grid>
                    <Grid style={{marginTop: "4px", marginLeft: "-4%"}} item md={3}>
                    {
                        (item._fk_cycle && item._fk_cycle != -1)?
                            <TextField
                                InputProps={{
                                  className: classes.inputFont
                                }}
                                InputLabelProps= {{
                                  className: classes.labelFont
                                }}
                                id={"pp"+index}
                                label="Product Priority"
                                margin="none"
                                value={item.is_priority}
                                onChange={e => onChange(index, "is_priority", e.target.value)}
                            />
                        :
                        <div className={classes.labelItemContainer}>
                            <InputLabel
                             className={classes.labelItem}
                             htmlFor="produc_priority">
                                Priority: {item.is_priority? item.is_priority : "None"}
                            </InputLabel>
                        </div>
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
                                    color="primary"
                                    checked={item.available_in_canada === 1 ? true : false}
                                    onChange={e => onChange(index, "available_in_canada", e.target.checked ? 1 : 0)}
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
                            <TextField
                                InputProps={{
                                  className: classes.inputFont,
                                  inputComponent: NumberFormatCustom,
                                }}
                                InputLabelProps= {{
                                  className: classes.labelFont
                                }}
                                id={"canadaprice"+index}
                                disabled={!(item.available_in_canada === 1)}
                                label="Canada Price"
                                margin="none"
                                defaultValue={(item.price_cad && item.price_cad != "")? item.price_cad : 0}
                                onChange={e => onChange(index, "price_cad", e.target.value)}
                            />
                        :
                        <div className={classes.labelItemContainer}>
                            <InputLabel
                             className={classes.labelItem}
                             htmlFor="produc_priority">
                                Canada price: {(item.price_cad && item.price_cad != "")? item.price_cad : "0"}
                            </InputLabel>
                        </div>
                    }
                        
                    </Grid>
                    <Grid style={{marginLeft: "-4%"}} item md={3}>
                    {
                        (item.available_in_canada && item.available_in_canada === 1)?
                            <Select
                                inputProps= {{
                                  className: classes.inputFont
                                }}
                                className={classes.selectCountry}
                                value={item.country_of_origin}
                                onChange={e => onChange(index, "country_of_origin", e.target.value)}
                                name="Country of origin"
                                displayEmpty
                            >
                                <MenuItem value={""} disabled>
                                    Country of Origin
                                </MenuItem>
                                <MenuItem value={"USA"}>USA</MenuItem>
                                <MenuItem value={"USA and Imported Materials"}>USA and Imported Materials</MenuItem>
                                <MenuItem value={"Imported of American Materials"}>Imported of American Materials</MenuItem>
                                <MenuItem value={"Imported - Specify Country"}>Imported - Specify Country</MenuItem>
                            </Select>
                        :
                            <div className={classes.labelItemContainer}>
                                <InputLabel
                                 className={classes.labelItem}
                                 htmlFor="country_of_origin">
                                    Country of Origin: {(item.country_of_origin && item.country_of_origin != "")? item.country_of_origin : "None"}
                                </InputLabel>
                            </div>
                        
                    }
                    </Grid>
                    <Grid style={{marginTop: "3px", marginLeft: "3%"}} item md={3}>
                        {
                            (item.country_of_origin === "Imported - Specify Country") ?
                               (item.available_in_canada && item.available_in_canada === 1)?
                                    <TextField
                                        InputProps={{
                                          className: classes.inputFont
                                        }}
                                        InputLabelProps= {{
                                          className: classes.labelFont
                                        }}
                                        id={"specifycountry"+index}
                                        label="Specify Country"
                                        margin="none"
                                        value={item.country_of_origin_other}
                                        onChange={e => onChange(index, "country_of_origin_other", e.target.value)}
                                    />
                                :
                                    <div className={classes.labelItemContainer}>
                                        <InputLabel
                                         className={classes.labelItem}
                                         htmlFor="specify_country_of_origin">
                                            Specify Country of Origin: {(item.country_of_origin_other && item.country_of_origin_other  != "")? item.country_of_origin_other : "None"}
                                        </InputLabel>
                                    </div>
                                    
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
                                    color="primary"
                                    checked={item.request_extension === 1 ? true : false}
                                    onChange={e => onChange(index, "request_extension", e.target.checked ? 1 : 0)}
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
                                <TextField
                                    InputProps={{
                                      className: classes.inputFont
                                    }}
                                    InputLabelProps= {{
                                      className: classes.labelFont
                                    }}
                                    id={"extensionreason"+index}
                                    disabled={!(item.request_extension === 1)}
                                    label="Extension Reason"
                                    margin="none"
                                    value={item.request_extension_note}
                                    onChange={e => onChange(index, "request_extension_note", e.target.value)}
                                />
                            :
                                <div className={classes.labelItemContainer}>
                                    <InputLabel
                                     className={classes.labelItem}
                                     htmlFor="Extension Reason">
                                        Extension Reason: {(item.request_extension_note && item.request_extension_note  != "")? item.request_extension_note : "None"}
                                    </InputLabel>
                                </div>
                            
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
                                    color="primary"
                                    checked={item.request_cancellation === 1 ? true : false}
                                    onChange={e => onChange(index, "request_cancellation", e.target.checked ? 1 : 0)}
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
                            <TextField
                                InputProps={{
                                  className: classes.inputFont
                                }}
                                InputLabelProps= {{
                                  className: classes.labelFont
                                }}
                                id={"cancelationreason"+index}
                                disabled={!(item.request_cancellation === 1)}
                                label="Cancelation Reason"
                                margin="none"
                                value={item.request_cancellation_notes}
                                onChange={e => onChange(index, "request_cancellation_notes", e.target.value)}
                            />
                        :
                            <div className={classes.labelItemContainer}>
                                <InputLabel
                                 className={classes.labelItem}
                                 htmlFor="Cancelation Reason">
                                    Cancelation Reason: {(item.request_cancellation_notes && item.request_cancellation_notes  != "")? item.request_cancellation_notes : "None"}
                                </InputLabel>
                            </div>
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
                                    deleteIcon={<DoneIcon style={{color:'#fff'}} />}
                                    onDelete={() => onChange(index, "tagged_missy", 1)}
                                    onClick={() => onChange(index, "tagged_missy", 1)}
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
                                    clickable
                                    className={classNames(classes.tagItemOff,classes.tagWith)}
                                    deleteIcon={<DoneIcon style={{color:'#fff'}} />}
                                    onDelete={() => onChange(index, "tagged_encore", 1)}
                                    onClick={() => onChange(index, "tagged_encore", 1)}
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
                                    clickable
                                    className={classNames(classes.tagItemOff,classes.tagWith)}
                                    deleteIcon={<DoneIcon style={{color:'#fff'}} />}
                                    onDelete={() => onChange(index, "tagged_petite", 1)}
                                    onClick={() => onChange(index, "tagged_petite", 1)}
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
                                    clickable
                                    className={classNames(classes.tagItemOff,classes.tagWith)}
                                    deleteIcon={<DoneIcon style={{color:'#fff'}} />}
                                    onDelete={() => onChange(index, "tagged_extended", 1)}
                                    onClick={() => onChange(index, "tagged_extended", 1)}
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