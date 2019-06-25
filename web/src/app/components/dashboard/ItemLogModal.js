import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {MenuItem, Modal, Typography, Grid, List, ListItem, 
        Divider, ListItemText, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import { getItemlogsApi } from '../../../api';
import '../Utils/dashboardCustom.css'


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

// const itemLogs = [
//   {
//     user_name: "User Name",
//     time_stamp: "2019-01-31 10:32",
//     event: "Edited",
//     details: {
//       "Your Field": "AbC",
//       "My Field": "123",
//       "His Field": "Lorem ipsum"
//     }
//   },
//   {
//     user_name: "User Name",
//     time_stamp: "2019-01-31 10:32",
//     event: "Edited",
//     details: {
//       "His Field": "Lorem ipsum",
//       "Your Field": "AbC",
//       "My Field": "123",
//     }
//   },
//   {
//     user_name: "User Name",
//     time_stamp: "2019-01-31 10:32",
//     event: "Edited",
//     details: {
//       "My Field": "123",
//       "His Field": "Lorem ipsum",
//       "Your Field": "AbC",
//     }
//   }
// ]

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 75,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
  },
  titleModal: {
    backgroundColor: "#004F7A",
    color: "white",
    padding: '10px'
  },
  headTable: {
    color: theme.palette.primary.main,
    fontWeight: "bold"
  },
  selected: {
    backgroundColor: theme.palette.primary.main + "!important",
    color: "white !important"
  },
  list: {
    padding: 0,
    borderRight: "1px solid rgba(0, 0, 0, 0.12)"
  },
  tableCell: {
    borderBottom: "none"
  }
});

class ItemLogModal extends React.Component {
  state = {
    open: false,
    selected: null,
    details: {},
    itemLogs: []
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.fetchPatchItemApi()
    
  };
  
  fetchPatchItemApi = () => {
    const { itemId } = this.props
    getItemlogsApi(itemId).then(response => {
      if (response.status === 200)
        this.setState({
          itemLogs: response.data
        })
    })
    .catch(console.error)
  }
  
  handleClose = () => {
    this.setState({ open: false });
  };
  
  handleListItemClick = (event, index) => {
    this.setState({
      selected: index,
      details: this.state.itemLogs[index].details
    })
  }

  render() {
    const { classes } = this.props;
    const {open, selected, details, itemLogs} = this.state

    return (
      <div>
        <MenuItem onClick={this.handleOpen}>Log</MenuItem>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography className={classes.titleModal} variant="h6" id="modal-title">
              Item Edit Log
            </Typography>        
            <Grid container spacing={8}>
              <Grid item xs={4}>
                <List className={classes.list}>
                  {itemLogs.map((item, index) => 
                    <React.Fragment>
                      <ListItem
                        classes={{selected: classes.selected}}
                        alignItems="flex-start"
                        button
                        selected={selected === index}
                        onClick={event => this.handleListItemClick(event, index)}
                      >
                        <ListItemText
                          primary={item.user_name}
                          primaryTypographyProps={{
                            color: "inherit"
                          }}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="caption"
                                // color="textPrimary"
                              >
                                {item.time_stamp}
                              </Typography>
                              {item.event}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      {index !== itemLogs.length - 1 && <Divider component="li" />}
                    </React.Fragment>
                  )}
                </List>
              </Grid>
              <Grid item xs={8}>
                <Table className={classes.table} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.headTable}>Field</TableCell>
                      <TableCell className={classes.headTable}>New Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(details).map((key, index) => 
                      <TableRow key={index}>
                        <TableCell className={classes.tableCell}>{key}</TableCell>
                        <TableCell className={classes.tableCell}>{details[key]}</TableCell>
                      </TableRow>
                    )}
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