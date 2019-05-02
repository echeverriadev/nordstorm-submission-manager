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


const AddAccordion = (props) => {
  const { classes, item, onChange, cycles } = props;

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
                            value={item.cycle}
                            onChange={e => onChange("cycle", e.target.value)}
                        >
                            <MenuItem value="" disabled>
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
                            value={item.annSalePrice}
                            onChange={e => onChange("annSalePrice", e.target.value)}
                        />
                    </Grid>
                    <Grid item md={3}>
                        <TextField
                            id="pp"
                            label="Product Priority"
                            margin="none"
                            value={item.productPriority}
                            onChange={e => onChange("productPriority", e.target.value)}
                        />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item md={3}>
                        <FormControlLabel
                            control={
                                <Switch
                                    value={item.availableInCanada}
                                    color="primary"
                                    checked={item.availableInCanada}
                                    onChange={e => onChange("availableInCanada", e.target.checked)}
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
                            disabled={!item.availableInCanada}
                            label="Canada Price"
                            margin="none"
                            value={item.canadaPrice}
                            onChange={e => onChange("canadaPrice", e.target.value)}
                        />
                    </Grid>
                    <Grid item md={3}>
                        <TextField
                            id="countryorigin"
                            disabled={!item.availableInCanada}
                            label="Country of origin"
                            margin="none"
                            value={item.countryOrigin}
                            onChange={e => onChange("countryOrigin", e.target.value)}
                        />
                    </Grid>
                    <Grid item md={3}>
                        <TextField
                            id="specifycountry"
                            disabled={!item.availableInCanada}
                            label="Specify Country"
                            margin="none"
                            value={item.specifyCountry}
                            onChange={e => onChange("specifyCountry", e.target.value)}
                        />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item md={3}>
                        <FormControlLabel
                            control={
                                <Switch
                                    value={item.requestExtension}
                                    color="primary"
                                    checked={item.requestExtension}
                                    onChange={e => onChange("requestExtension", e.target.checked)}
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
                            disabled={!item.requestExtension}
                            label="Extension Reason"
                            margin="none"
                            value={item.extensionReason}
                            onChange={e => onChange("extensionReason", e.target.value)}
                        />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item md={3}>
                        <FormControlLabel
                            control={
                                <Switch
                                    value={item.requestCancelation}
                                    color="primary"
                                    checked={item.requestCancelation}
                                    onChange={e => onChange("requestCancelation", e.target.checked)}
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
                            disabled={!item.requestCancelation}
                            label="Cancelation Reason"
                            margin="none"
                            value={item.cancelationReason}
                            onChange={e => onChange("cancelationReason", e.target.value)}
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

AddAccordion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddAccordion);