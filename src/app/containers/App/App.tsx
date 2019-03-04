import * as React from 'react';
import { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import PrimaryAppBar from '../../components/shared/PrimaryAppBar';

// import { createMuiTheme } from '@material-ui/core/styles';
import createMuiTheme, { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';
// import { createMuiTheme } from '@material-ui/core/styles';
import { theme } from '../../../theme/muitheme'

//import logo from './logo.svg';
import './App.css';

import Dashboard from '../../components/dashboard';



const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing.unit * 20,
    },
  });


type State = {
  open: boolean;
};


class App extends Component {

  state = {
    open: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  render() {

    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <PrimaryAppBar />
          <Typography variant="subtitle1" gutterBottom>
            <Dashboard></Dashboard>
          </Typography>
        </div>
      </MuiThemeProvider>

    );
  }
}

export default App;


// <PrimaryAppBar />
