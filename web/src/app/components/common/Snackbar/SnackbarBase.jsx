import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackBarContentWrapper from "./SnackbarContentWrapper";

class SnackbarBase extends React.Component {
  useStyles = () => {
    return makeStyles(theme => ({
      margin: {
        margin: theme.spacing(1)
      }
    }));
  };

  render() {
    const {
      open, // handle the open method
      snackbarType, // success, info, warning, error
      anchorOrigin, // position horizontal and vertical
      duration, // duration in milliseconds
      message, // message
      onClose // handles the close method
    } = this.props;

    return (
      <React.Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: anchorOrigin.vertical,
            horizontal: anchorOrigin.horizontal
          }}
          autoHideDuration={duration}
          open={open}
          onClose={onClose}
        >
          <SnackBarContentWrapper
            variant={snackbarType}
            message={message}
            onClose={onClose}
          />
        </Snackbar>
      </React.Fragment>
    );
  }
}

export default SnackbarBase;
