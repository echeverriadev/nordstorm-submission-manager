import * as React from "react";
import { Component } from "react";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "../../../theme/muitheme";
import Typography from "@material-ui/core/Typography";
import createStyles from "@material-ui/core/styles/createStyles";
import Dashboard from "../../components/dashboard";
import "./App.css";
import { nauthLogin, nauthSetCookie } from "../../../api";

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
    open: false
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleClick = () => {
    this.setState({
      open: true
    });
  };

  /**
   * Authentication
   */
  auth() {
    nauthLogin()
      .then(response => {
        let queryStrings = window.location.hash;
        let queryStringArray = queryStrings.split("&");
        let totalLength = "#access_token=".length;
        let totalLengthToken = queryStringArray[0].length;
        let token = queryStringArray[0].substring(
          totalLength,
          totalLengthToken
        );
        let expirationTime = 0;

        if (queryStringArray[2]) {
          expirationTime = parseInt(queryStringArray[2].split("=")[1]);
        }

        if (!response.logged && token.length === 0) {
          window.location = response.oktaUrl;
        } else if (!response.logged && token.length > 0) {
          history.pushState(
            "",
            document.title,
            window.location.pathname + window.location.search
          );
          let body = {
            token,
            expirationTime: expirationTime
          };

          nauthSetCookie(body)
            .then(response => {
              console.log(response);
            })
            .catch(error => console.error(error));
        } else {
          console.log(response.logged);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    this.auth();
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Dashboard />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

// <PrimaryAppBar />
