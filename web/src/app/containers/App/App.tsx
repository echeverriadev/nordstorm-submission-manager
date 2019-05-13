import * as React from 'react';
import { Component } from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../../theme/muitheme'
import Typography from '@material-ui/core/Typography';
import createStyles from '@material-ui/core/styles/createStyles';
import Dashboard from '../../components/dashboard';
import './App.css';



const styles = (theme: Theme) =>
  createStyles({
    // root: {
    //   textAlign: 'center',
    //   paddingTop: theme.spacing.unit * 20,
    // },
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
          <Dashboard></Dashboard>
        </div>
      </MuiThemeProvider>

    );
  }
}

export default App;


// <PrimaryAppBar />
