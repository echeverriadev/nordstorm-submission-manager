import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {MenuItem, Modal, Typography, Grid, List, ListItem, 
        Divider, ListItemText, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';



function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 75,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    // padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    color: "white"
  }
});

class ItemLogModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <MenuItem onClick={this.handleOpen}>Log</MenuItem>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography className={classes.title} variant="h6" id="modal-title">
              Item Edit Log
            </Typography>        
            <Grid container spacing={8}>
              <Grid item xs={4}>
                <List>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="User Name"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            2019-01-31 10:32
                          </Typography>
                          Edited
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="User Name"
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            2019-01-31 10:32
                          </Typography>
                          Edited
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={8}>
                <Table className={classes.table} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Field</TableCell>
                      <TableCell>New Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>My Field</TableCell>
                      <TableCell>123</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Your Field</TableCell>
                      <TableCell>AbC</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>His Field</TableCell>
                      <TableCell>Lorem ipsum</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

ItemLogModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ItemLogModalWrapped = withStyles(styles)(ItemLogModal);

export default ItemLogModalWrapped;