import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
import Typography from '@material-ui/core/Typography';
import { onlyNumber } from '../../../../helpers/validation';

const styles = theme => ({
  root: {
    backgroundColor: "#E6E4E4",
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
    width: "95%",
  },
  select: {
    width: "95%"
  },
  switch: {
    fontSize: 18,
    margin: 0,
    width: "95%",
    justifyContent: "space-between"
  },
  tagsList: {
    margin: 0,
    padding: 0,
    width: "100%",
    textAlign: "left"
  },
  tagItem: {
    marginTop: theme.spacing.unit
  }
});


const Accordion = (props) => {
  const { classes, item, index, onChange, cycles } = props;

  return (
    <CardContent className={classes.root}>
        <Grid container>
            <Grid item md={1}>
                <FormHelperText className={classes.helperText}>Drop the image to replace</FormHelperText>
            </Grid>
            <Grid item className={classes.column} md={9}>
                <Grid container>
                    <Grid item md={3}>
                        <FormHelperText className={classes.selectLabel}>Cycles</FormHelperText>
                        <Select
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
                    <Grid item md={3}>
                        <TextField
                            id="asp"
                            label="Ann. sale price"
                            margin="none"
                            value={item.retail_price}
                            onChange={e => onChange(index, "retail_price", onlyNumber(e.target.value))}
                        />
                    </Grid>
                    <Grid item md={3}>
                        <TextField
                            id="pp"
                            label="Product Priority"
                            margin="none"
                            value={item.is_priority}
                            onChange={e => onChange(index, "is_priority", e.target.value)}
                        />
                    </Grid>
                </Grid>

                <Grid container>
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
                            label="Available in Canada"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item md={3}>
                        <TextField
                            id="canadaprice"
                            disabled={!(item.available_in_canada === 1)}
                            label="Canada Price"
                            margin="none"
                            value={item.price_cad}
                            onChange={e => onChange(index, "price_cad", onlyNumber(e.target.value))}
                        />
                    </Grid>
                    <Grid item md={3}>
                        <TextField
                            id="countryorigin"
                            label="Country of origin"
                            margin="none"
                            value={item.country_of_origin}
                            onChange={e => onChange(index, "country_of_origin", e.target.value)}
                        />
                    </Grid>
                    <Grid item md={3}>
                        <TextField
                            id="specifycountry"
                            label="Specify Country"
                            margin="none"
                            value={item.country_of_origin_other}
                            onChange={e => onChange(index, "country_of_origin_other", e.target.value)}
                        />
                    </Grid>
                </Grid>

                <Grid container>
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
                            label="Request Extension"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item md={3}>
                        <TextField
                            id="extensionreason"
                            disabled={!(item.request_extension === 1)}
                            label="Extension Reason"
                            margin="none"
                            value={item.request_extension_note}
                            onChange={e => onChange(index, "request_extension_note", e.target.value)}
                        />
                    </Grid>
                </Grid>

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
                            label="Request Cancelation"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item md={3}>
                        <TextField
                            id="cancelationreason"
                            disabled={!(item.request_cancellation === 1)}
                            label="Cancelation Reason"
                            margin="none"
                            value={item.request_cancellation_notes}
                            onChange={e => onChange(index, "request_cancellation_notes", e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item className={classes.column} md={2}>
                <Grid container direction="column">
                    <Grid item md={3}>
                        <Typography variant="caption">Departament name</Typography>
                        <Typography variant="body1">{item.departament}</Typography>
                    </Grid>
                    <Grid className={classes.tagsList} item md={9}>
                        <Typography className={classes.tagItem} variant="caption">Tags</Typography>
                        <Chip
                            avatar={<Avatar>C</Avatar>}
                            label="Category"
                            clickable
                            className={classes.tagItem}
                            color="primary"
                            deleteIcon={<DoneIcon />}
                        />
                        <Chip
                            avatar={<Avatar>C</Avatar>}
                            label="Category"
                            clickable
                            className={classes.tagItem}
                            color="primary"
                            deleteIcon={<DoneIcon />}
                        />
                        <Chip
                            avatar={<Avatar>C</Avatar>}
                            label="Category"
                            clickable
                            className={classes.tagItem}
                            color="primary"
                            deleteIcon={<DoneIcon />}
                        />
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